
"use strict";

// ============================================================
// CLEANPLAN - ADMIN HISTORY
// PART 1 OF 2
// ============================================================


// ============================================================
// ELEMENTS
// ============================================================

const historyFilterForm =
    document.getElementById("historyFilterForm");

const historyPropertySelect =
    document.getElementById("historyPropertySelect");

const historyFloorSelect =
    document.getElementById("historyFloorSelect");

const historySearchButton =
    document.getElementById("historySearchButton");

const historyMessage =
    document.getElementById("historyMessage");

const historyResults =
    document.getElementById("historyResults");


// ============================================================
// STATE
// ============================================================

let historyAssignments = [];
let historyResidentNames = new Map();
let historyDocsByAssignment = new Map();

let historyMessageKey = "historyInitialMessage";
let historyMessageFallback =
    "Loggen blir tilgjengelig når datatilkoblingen er ferdig.";
let historyMessageValues = {};

let historyRequestId = 0;


// ============================================================
// TRANSLATIONS
// ============================================================

function historyTranslate(key, fallback = "", values = {}) {

    const i18n = window.CleanPlanI18n;

    let result = fallback || key;

    if (
        i18n &&
        typeof i18n.t === "function"
    ) {

        const translated = i18n.t(key);

        if (
            typeof translated === "string" &&
            translated !== key
        ) {

            result = translated;

        }

    }

    for (const [name, value] of Object.entries(values)) {

        result = result.replaceAll(
            `{${name}}`,
            String(value)
        );

    }

    return result;

}


function historyIsEnglish() {

    return (
        window.CleanPlanI18n?.getLanguage?.() === "en"
    );

}


function historyLocale() {

    return historyIsEnglish()
        ? "en-GB"
        : "nb-NO";

}



function formatHistoryDate(dateValue, includeTime = false) {

    if (!dateValue) {
        return "";
    }

    const date = new Date(
        /^\d{4}-\d{2}-\d{2}$/.test(dateValue)
            ? `${dateValue}T12:00:00`
            : dateValue
    );

    if (Number.isNaN(date.getTime())) {
        return dateValue;
    }

    const day = String(
        date.getDate()
    ).padStart(2, "0");

    const month = String(
        date.getMonth() + 1
    ).padStart(2, "0");

    const year = date.getFullYear();

    let formattedDate =
        `${day}.${month}.${year}`;

    if (includeTime) {

        const hours = String(
            date.getHours()
        ).padStart(2, "0");

        const minutes = String(
            date.getMinutes()
        ).padStart(2, "0");

        const seconds = String(
            date.getSeconds()
        ).padStart(2, "0");

        formattedDate +=
            `, ${hours}:${minutes}:${seconds}`;

    }

    return formattedDate;

}



function historyText(
    key,
    norwegianFallback,
    englishFallback,
    values = {}
) {

    return historyTranslate(
        key,
        historyIsEnglish()
            ? englishFallback
            : norwegianFallback,
        values
    );

}


// ============================================================
// MESSAGES
// ============================================================

function showHistoryMessage(message) {

    if (historyMessage) {
        historyMessage.textContent = message;
    }

}


function showHistoryTranslatedMessage(
    key,
    norwegianFallback,
    englishFallback,
    values = {}
) {

    historyMessageKey = key;

    historyMessageFallback = historyIsEnglish()
        ? englishFallback
        : norwegianFallback;

    historyMessageValues = {
        ...values,
        norwegianFallback,
        englishFallback
    };

    showHistoryMessage(
        historyText(
            key,
            norwegianFallback,
            englishFallback,
            values
        )
    );

}


function refreshHistoryMessage() {

    if (!historyMessageKey) {
        return;
    }

    const {
        norwegianFallback,
        englishFallback,
        ...values
    } = historyMessageValues;

    showHistoryMessage(
        historyText(
            historyMessageKey,
            norwegianFallback || historyMessageFallback,
            englishFallback || historyMessageFallback,
            values
        )
    );

}


// ============================================================
// SELECT OPTIONS
// ============================================================

function addSelectOption(select, value, label) {

    const option =
        document.createElement("option");

    option.value = value;
    option.textContent = label;

    select.appendChild(option);

}


function updateHistorySelectLabels() {

    const propertyPlaceholder =
        historyPropertySelect.querySelector(
            'option[value=""]'
        );

    if (propertyPlaceholder) {

        propertyPlaceholder.textContent =
            historyText(
                "historySelectProperty",
                "Velg bolig",
                "Select property"
            );

    }

    const floorPlaceholder =
        historyFloorSelect.querySelector(
            'option[value=""]'
        );

    if (floorPlaceholder) {

        floorPlaceholder.textContent =
            historyText(
                "historyAllFloors",
                "Alle etasjer",
                "All floors"
            );

    }

}


// ============================================================
// STATUS
// ============================================================

function getHistoryStatus(status) {

    const statusKeys = {
        pending: "historyPending",
        completed: "historyCompleted",
        skipped: "historySkipped",
        cancelled: "historyCancelled"
    };

    const norwegianStatuses = {
        pending: "Venter",
        completed: "Fullført",
        skipped: "Hoppet over",
        cancelled: "Avbrutt"
    };

    const englishStatuses = {
        pending: "Pending",
        completed: "Completed",
        skipped: "Skipped",
        cancelled: "Cancelled"
    };

    const key = statusKeys[status];

    if (!key) {

        return status || historyText(
            "adminUnknown",
            "Ukjent",
            "Unknown"
        );

    }

    return historyText(
        key,
        norwegianStatuses[status],
        englishStatuses[status]
    );

}


// ============================================================
// LOAD FLOORS
// ============================================================

async function loadHistoryFloors() {

    const propertyId =
        historyPropertySelect.value;

    historyFloorSelect.replaceChildren();

    addSelectOption(
        historyFloorSelect,
        "",
        historyText(
            "historyAllFloors",
            "Alle etasjer",
            "All floors"
        )
    );

    historyFloorSelect.disabled = true;

    if (!propertyId) {
        return;
    }

    const { data, error } =
        await supabaseClient
            .from("floors")
            .select("id, name, floor_number")
            .eq("property_id", propertyId)
            .order("floor_number", {
                ascending: true
            });

    if (error) {

        showHistoryTranslatedMessage(
            "historyFloorsError",
            "Kunne ikke hente etasjer: {error}",
            "Could not load floors: {error}",
            {
                error: error.message
            }
        );

        return;

    }

    for (const floor of data || []) {

        const fallbackName =
            historyIsEnglish()
                ? `Floor ${floor.floor_number}`
                : `Etasje ${floor.floor_number}`;

        addSelectOption(
            historyFloorSelect,
            floor.id,
            floor.name || fallbackName
        );

    }

    historyFloorSelect.disabled = false;

}


// ============================================================
// LOAD PROPERTIES
// ============================================================

async function loadHistoryProperties() {

    const { data, error } =
        await supabaseClient
            .from("properties")
            .select("id, name, address")
            .order("name", {
                ascending: true
            });

    if (error) {

        showHistoryTranslatedMessage(
            "historyPropertiesError",
            "Kunne ikke hente boliger: {error}",
            "Could not load properties: {error}",
            {
                error: error.message
            }
        );

        return;

    }

    historyPropertySelect.replaceChildren();

    addSelectOption(
        historyPropertySelect,
        "",
        historyText(
            "historySelectProperty",
            "Velg bolig",
            "Select property"
        )
    );

    for (const property of data || []) {

        addSelectOption(
            historyPropertySelect,
            property.id,
            property.name ||
            property.address ||
            historyText(
                "historyPropertyLabel",
                "Bolig",
                "Property"
            )
        );

    }

    if (!data || data.length === 0) {

        showHistoryTranslatedMessage(
            "historyNoProperties",
            "Ingen boliger er tilgjengelige for denne kontoen.",
            "No properties are available for this account."
        );

        return;

    }

    historyPropertySelect.disabled = false;
    historySearchButton.disabled = false;

    showHistoryTranslatedMessage(
        "historySearchPrompt",
        "Velg bolig og etasje for å søke.",
        "Select a property and floor to search."
    );

}


// ============================================================
// AUTHORIZATION
// ============================================================

async function initializeAdminHistory() {

    try {

        const {
            data: authData,
            error: authError
        } = await supabaseClient.auth.getUser();

        const user = authData?.user;

        if (authError || !user) {

            window.location.replace("index.html");
            return;

        }

        const {
            data: profile,
            error: profileError
        } = await supabaseClient
            .from("profiles")
            .select("full_name, email, role, is_active")
            .eq("id", user.id)
            .single();

        if (
            profileError ||
            !profile ||
            !profile.is_active ||
            !["admin", "superadmin"].includes(profile.role)
        ) {

            showHistoryTranslatedMessage(
                "historyAccessDenied",
                "Du har ikke tilgang til denne siden.",
                "You do not have access to this page."
            );

            return;

        }


// ============================================================
// HEADER PROFILE
// ============================================================

        const adminName =
            document.getElementById("adminName");

        const adminRole =
            document.getElementById("adminRole");

        const adminInitial =
            document.getElementById("adminInitial");

        if (adminName) {

            adminName.textContent =
                profile.full_name || "Administrator";

        }

        if (adminRole) {

            adminRole.textContent =
                profile.role === "superadmin"
                    ? "Superadmin"
                    : "Admin";

        }

        if (adminInitial) {

            const initialSource =
                profile.full_name ||
                profile.email ||
                "A";

            adminInitial.textContent =
                initialSource.trim().charAt(0).toUpperCase();

        }


        await loadHistoryProperties();

    } catch (error) {

        console.error(
            "Could not initialize admin history:",
            error
        );

        showHistoryTranslatedMessage(
            "historyInitializationError",
            "Kunne ikke laste historikksiden: {error}",
            "Could not load the history page: {error}",
            {
                error: error.message
            }
        );

    }

}


// ============================================================
// RESIDENT NAMES
// ============================================================

async function loadHistoryResidentNames(assignments) {

    const residentNames = new Map();

    const residentIds = [
        ...new Set(
            assignments
                .map(item => item.resident_id)
                .filter(Boolean)
        )
    ];

    if (residentIds.length === 0) {
        return residentNames;
    }

    const {
        data: residents,
        error: residentsError
    } = await supabaseClient
        .from("residents")
        .select("id, profile_id")
        .in("id", residentIds);

    if (residentsError) {
        throw residentsError;
    }

    const profileIds = [
        ...new Set(
            (residents || [])
                .map(resident => resident.profile_id)
                .filter(Boolean)
        )
    ];

    const profileNames = new Map();

    if (profileIds.length > 0) {

        const {
            data: profiles,
            error: profilesError
        } = await supabaseClient
            .from("profiles")
            .select("id, full_name")
            .in("id", profileIds);

        if (profilesError) {
            throw profilesError;
        }

        for (const profile of profiles || []) {

            profileNames.set(
                profile.id,
                profile.full_name
            );

        }

    }

    for (const resident of residents || []) {

        residentNames.set(
            resident.id,
            profileNames.get(resident.profile_id) || ""
        );

    }

    return residentNames;

}


// ============================================================
// RENDER HISTORY ENTRIES
// ============================================================

function renderHistoryEntries() {

    historyResults.replaceChildren();

    for (const assignment of historyAssignments) {

        const article =
            document.createElement("article");

        article.className = "history-entry";


        // ----------------------------------------------------
        // WEEK
        // ----------------------------------------------------

        const heading =
            document.createElement("h3");

        heading.textContent =
            historyText(
                "historyCleaning",
                "Rengjøring",
                "Cleaning"
            ) + " – " + formatHistoryDate(assignment.week_start);

        article.appendChild(heading);


        // ----------------------------------------------------
        // RESIDENT
        // ----------------------------------------------------

        const resident =
            document.createElement("p");

        let residentName =
            historyText(
                "historyNotAssigned",
                "Ikke tildelt",
                "Not assigned"
            );

        if (assignment.resident_id) {

            residentName =
                historyResidentNames.get(
                    assignment.resident_id
                ) ||
                historyText(
                    "historyUnknownResident",
                    "Ukjent beboer",
                    "Unknown resident"
                );

        }

        resident.textContent =
            historyText(
                "historyResponsibleResident",
                "Ansvarlig beboer",
                "Responsible resident"
            ) + ": " + residentName;

        article.appendChild(resident);


        // ----------------------------------------------------
        // STATUS
        // ----------------------------------------------------

        const status =
            document.createElement("p");


        const cleaningDeadline = new Date(
            assignment.week_start + "T18:00:00"
        );

        const isNotCompleted =
            assignment.status === "pending" &&
            !assignment.signed_at &&
            new Date() > cleaningDeadline;

        status.textContent =
            historyText(
                "historyStatus",
                "Status",
                "Status"
            ) + ": " +
            (
                isNotCompleted
                    ? (historyIsEnglish()
                        ? "Not completed"
                        : "Ikke utført")
                    : getHistoryStatus(assignment.status)
            );


        article.appendChild(status);


        // ----------------------------------------------------
        // SIGNATURE
        // ----------------------------------------------------

        const signature =
            document.createElement("p");

        if (assignment.signed_at) {

            const signedDate =
                formatHistoryDate(
                    assignment.signed_at,
                    true
                );

            signature.textContent =
                historyText(
                    "historySigned",
                    "Signert",
                    "Signed"
                ) + ": " + signedDate;

        } else {

            signature.textContent =
                historyText(
                    "historyNotSigned",
                    "Ikke signert",
                    "Not signed"
                );

        }

        article.appendChild(signature);


        // ----------------------------------------------------
        // DOCUMENTATION
        // ----------------------------------------------------

        const docs =
            historyDocsByAssignment.get(
                assignment.id
            ) || [];

        const docHeading =
            document.createElement("p");

        docHeading.textContent =
            historyText(
                "historyDocumentationImages",
                "Dokumentasjonsbilder",
                "Documentation photos"
            ) + ": " + docs.length;

        article.appendChild(docHeading);


        // ----------------------------------------------------
        // IMAGE GALLERY
        // ----------------------------------------------------

        if (docs.length > 0) {

            const gallery =
                document.createElement("div");

            gallery.className =
                "history-image-gallery";

            article.appendChild(gallery);

            for (const doc of docs) {

                if (!doc.signedUrl) {
                    continue;
                }

                const image =
                    document.createElement("img");

                image.className =
                    "history-image";

                image.alt =
                    doc.file_name ||
                    historyText(
                        "historyDocumentationImage",
                        "Dokumentasjonsbilde",
                        "Documentation photo"
                    );

                image.loading = "lazy";

                image.src = doc.signedUrl;

                image.addEventListener(
                    "click",
                    function () {

                        const images =
                            Array.from(
                                gallery.querySelectorAll(
                                    ".history-image"
                                )
                            );

                        const imageUrls =
                            images.map(img => img.src);

                        const selectedIndex =
                            images.indexOf(image);

                        openHistoryImage(
                            imageUrls,
                            selectedIndex
                        );

                    }
                );

                gallery.appendChild(image);

            }

        }

        historyResults.appendChild(article);

    }

}


// ============================================================
// LOAD CLEANING HISTORY
// ============================================================

async function loadCleaningHistory() {

    const propertyId =
        historyPropertySelect.value;

    const floorId =
        historyFloorSelect.value;

    if (!propertyId) {

        showHistoryTranslatedMessage(
            "historySelectPropertyFirst",
            "Velg en bolig først.",
            "Select a property first."
        );

        return;

    }

    const requestId = ++historyRequestId;

    historySearchButton.disabled = true;

    historyResults.replaceChildren();

    historyAssignments = [];
    historyResidentNames = new Map();
    historyDocsByAssignment = new Map();

    showHistoryTranslatedMessage(
        "historyLoading",
        "Henter rengjøringshistorikk ...",
        "Loading cleaning history ..."
    );

    try {

        // ----------------------------------------------------
        // CLEANING PLANS
        // ----------------------------------------------------

        let plansQuery =
            supabaseClient
                .from("cleaning_plans")
                .select("id, floor_id")
                .eq("property_id", propertyId);

        if (floorId) {

            plansQuery =
                plansQuery.eq(
                    "floor_id",
                    floorId
                );

        }

        const {
            data: plans,
            error: plansError
        } = await plansQuery;

        if (plansError) {
            throw plansError;
        }

        if (requestId !== historyRequestId) {
            return;
        }

        if (!plans || plans.length === 0) {

            showHistoryTranslatedMessage(
                "historyNoPlans",
                "Ingen rengjøringsplaner funnet.",
                "No cleaning schedules found."
            );

            return;

        }

        const planIds =
            plans.map(plan => plan.id);


        // ----------------------------------------------------
        // ASSIGNMENTS
        // ----------------------------------------------------

        const {
            data: assignments,
            error: assignmentError
        } = await supabaseClient
            .from("cleaning_week_assignments")
            .select(
                "id, plan_id, week_start, resident_id, " +
                "status, signed_at, signed_by"
            )
            .in("plan_id", planIds)
            .order("week_start", {
                ascending: false
            })
            .limit(100);

        if (assignmentError) {
            throw assignmentError;
        }

        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const pastAssignments = (assignments || []).filter(
            assignment => {

                if (!assignment.week_start) {
                    return false;
                }

                const cleaningDate = new Date(
                    assignment.week_start + "T00:00:00"
                );

                return cleaningDate < today;

            }
        );


        if (requestId !== historyRequestId) {
            return;
        }


        if (
            pastAssignments.length === 0
        ) {

            showHistoryTranslatedMessage(
                "historyNoEntries",
                "Ingen rengjøringshistorikk funnet.",
                "No cleaning history found."
            );

            return;

        }



        // ----------------------------------------------------
        // RESIDENT NAMES
        // ----------------------------------------------------

        let residentNames = new Map();

        try {

            residentNames =
                await loadHistoryResidentNames(
                    pastAssignments
                );

        } catch (residentError) {

            console.error(
                "Could not load resident names:",
                residentError
            );

            // History remains visible even when
            // profile access is restricted by RLS.

        }

        if (requestId !== historyRequestId) {
            return;
        }


        // ----------------------------------------------------
        // DOCUMENTATION
        // ----------------------------------------------------

        const assignmentIds =
            pastAssignments.map(item => item.id);

        const {
            data: documentation,
            error: documentationError
        } = await supabaseClient
            .from("cleaning_documentation")
            .select(
                "id, assignment_id, storage_path, " +
                "file_name, created_at"
            )
            .in(
                "assignment_id",
                assignmentIds
            );

        if (documentationError) {
            throw documentationError;
        }

        if (requestId !== historyRequestId) {
            return;
        }

        const docsByAssignment = new Map();

        for (const doc of documentation || []) {

            if (!docsByAssignment.has(doc.assignment_id)) {

                docsByAssignment.set(
                    doc.assignment_id,
                    []
                );

            }

            docsByAssignment
                .get(doc.assignment_id)
                .push({
                    ...doc,
                    signedUrl: null
                });

        }


        // ----------------------------------------------------
        // SIGNED IMAGE URLS
        // ----------------------------------------------------

        for (const docs of docsByAssignment.values()) {

            for (const doc of docs) {

                if (!doc.storage_path) {
                    continue;
                }

                const {
                    data,
                    error
                } = await supabaseClient
                    .storage
                    .from("cleaning-documentation")
                    .createSignedUrl(
                        doc.storage_path,
                        3600
                    );

                if (requestId !== historyRequestId) {
                    return;
                }

                if (error || !data?.signedUrl) {

                    console.error(
                        "Could not load documentation image:",
                        error
                    );

                    continue;

                }

                doc.signedUrl = data.signedUrl;

            }

        }


        // ----------------------------------------------------
        // SAVE DATA FOR LANGUAGE SWITCHING
        // ----------------------------------------------------

        historyAssignments = pastAssignments;

        historyResidentNames = residentNames;

        historyDocsByAssignment =
            docsByAssignment;


        // ----------------------------------------------------
        // RENDER
        // ----------------------------------------------------

        renderHistoryEntries();

        showHistoryTranslatedMessage(
            "historyShowingEntries",
            "Viser {count} loggoppføringer.",
            "Showing {count} history entries.",
            {
                count: pastAssignments.length
            }
        );

    } catch (error) {

        if (requestId !== historyRequestId) {
            return;
        }

        console.error(
            "History error:",
            error
        );

        showHistoryTranslatedMessage(
            "historyLoadError",
            "Kunne ikke hente loggen: {error}",
            "Could not load history: {error}",
            {
                error: error.message
            }
        );

    } finally {

        if (requestId === historyRequestId) {

            historySearchButton.disabled = false;

        }

    }

}


// ============================================================
// CLEANPLAN - ADMIN HISTORY
// PART 2 OF 2
// ============================================================


// ============================================================
// FULL-SIZE IMAGE VIEWER
// ============================================================

function openHistoryImage(imageUrls, startIndex = 0) {

    if (
        !Array.isArray(imageUrls) ||
        imageUrls.length === 0
    ) {
        return;
    }

    let currentIndex = Math.max(
        0,
        Math.min(startIndex, imageUrls.length - 1)
    );


    // ========================================================
    // OVERLAY
    // ========================================================

    const overlay =
        document.createElement("div");

    overlay.className =
        "history-image-overlay";

    overlay.setAttribute(
        "role",
        "dialog"
    );

    overlay.setAttribute(
        "aria-modal",
        "true"
    );

    overlay.setAttribute(
        "aria-label",
        historyText(
            "historyDocumentationImages",
            "Dokumentasjonsbilder",
            "Documentation photos"
        )
    );


    // ========================================================
    // FULL-SIZE IMAGE
    // ========================================================

    const fullImage =
        document.createElement("img");

    fullImage.className =
        "history-full-image";


    // ========================================================
    // CLOSE BUTTON
    // ========================================================

    const closeButton =
        document.createElement("button");

    closeButton.type = "button";

    closeButton.className =
        "history-image-close";

    closeButton.textContent = "×";

    closeButton.setAttribute(
        "aria-label",
        historyText(
            "historyCloseImage",
            "Lukk bilde",
            "Close image"
        )
    );


    // ========================================================
    // PREVIOUS BUTTON
    // ========================================================

    const previousButton =
        document.createElement("button");

    previousButton.type = "button";

    previousButton.className =
        "history-image-nav history-image-prev";

    previousButton.textContent = "‹";

    previousButton.setAttribute(
        "aria-label",
        historyText(
            "historyPreviousImage",
            "Forrige bilde",
            "Previous image"
        )
    );


    // ========================================================
    // NEXT BUTTON
    // ========================================================

    const nextButton =
        document.createElement("button");

    nextButton.type = "button";

    nextButton.className =
        "history-image-nav history-image-next";

    nextButton.textContent = "›";

    nextButton.setAttribute(
        "aria-label",
        historyText(
            "historyNextImage",
            "Neste bilde",
            "Next image"
        )
    );


    // ========================================================
    // IMAGE COUNTER
    // ========================================================

    const counter =
        document.createElement("div");

    counter.className =
        "history-image-counter";


    // ========================================================
    // SHOW SELECTED IMAGE
    // ========================================================

    function showImage() {

        fullImage.src =
            imageUrls[currentIndex];

        fullImage.alt =
            historyText(
                "historyDocumentationImage",
                "Dokumentasjonsbilde",
                "Documentation photo"
            ) + " " + (currentIndex + 1);

        counter.textContent =
            `${currentIndex + 1} / ${imageUrls.length}`;

        previousButton.disabled =
            currentIndex === 0;

        nextButton.disabled =
            currentIndex === imageUrls.length - 1;

    }


    // ========================================================
    // PREVIOUS IMAGE
    // ========================================================

    function previousImage() {

        if (currentIndex > 0) {

            currentIndex--;

            showImage();

        }

    }


    // ========================================================
    // NEXT IMAGE
    // ========================================================

    function nextImage() {

        if (
            currentIndex <
            imageUrls.length - 1
        ) {

            currentIndex++;

            showImage();

        }

    }


    // ========================================================
    // UPDATE MODAL LANGUAGE
    // ========================================================

    function updateModalLanguage() {

        overlay.setAttribute(
            "aria-label",
            historyText(
                "historyDocumentationImages",
                "Dokumentasjonsbilder",
                "Documentation photos"
            )
        );

        closeButton.setAttribute(
            "aria-label",
            historyText(
                "historyCloseImage",
                "Lukk bilde",
                "Close image"
            )
        );

        previousButton.setAttribute(
            "aria-label",
            historyText(
                "historyPreviousImage",
                "Forrige bilde",
                "Previous image"
            )
        );

        nextButton.setAttribute(
            "aria-label",
            historyText(
                "historyNextImage",
                "Neste bilde",
                "Next image"
            )
        );

        showImage();

    }


    // ========================================================
    // CLOSE MODAL
    // ========================================================

    function closeImage() {

        document.removeEventListener(
            "keydown",
            handleKeydown
        );

        window.removeEventListener(
            "cleanplan:languagechange",
            updateModalLanguage
        );

        overlay.remove();

    }


    // ========================================================
    // KEYBOARD NAVIGATION
    // ========================================================

    function handleKeydown(event) {

        if (event.key === "Escape") {

            closeImage();

            return;

        }

        if (event.key === "ArrowLeft") {

            event.preventDefault();

            previousImage();

        }

        if (event.key === "ArrowRight") {

            event.preventDefault();

            nextImage();

        }

    }


    // ========================================================
    // BUTTON EVENTS
    // ========================================================

    closeButton.addEventListener(
        "click",
        closeImage
    );

    previousButton.addEventListener(
        "click",
        previousImage
    );

    nextButton.addEventListener(
        "click",
        nextImage
    );


    // ========================================================
    // CLOSE WHEN CLICKING OUTSIDE IMAGE
    // ========================================================

    overlay.addEventListener(
        "click",
        function (event) {

            if (event.target === overlay) {

                closeImage();

            }

        }
    );


    // ========================================================
    // LANGUAGE CHANGE
    // ========================================================

    window.addEventListener(
        "cleanplan:languagechange",
        updateModalLanguage
    );


    // ========================================================
    // KEYBOARD EVENT
    // ========================================================

    document.addEventListener(
        "keydown",
        handleKeydown
    );


    // ========================================================
    // ADD ELEMENTS
    // ========================================================

    overlay.appendChild(closeButton);

    overlay.appendChild(previousButton);

    overlay.appendChild(fullImage);

    overlay.appendChild(nextButton);

    overlay.appendChild(counter);

    document.body.appendChild(overlay);


    // ========================================================
    // INITIAL IMAGE
    // ========================================================

    showImage();

    closeButton.focus();

}


// ============================================================
// LANGUAGE CHANGE - REFRESH HISTORY
// ============================================================

window.addEventListener(
    "cleanplan:languagechange",
    function () {

        // Update property and floor placeholder labels.

        updateHistorySelectLabels();


        // Update the message using the selected language.

        refreshHistoryMessage();


        // Re-render existing history entries.
        // No new Supabase request is necessary.

        if (historyAssignments.length > 0) {

            renderHistoryEntries();

        }

    }
);


// ============================================================
// PROPERTY CHANGE
// ============================================================

if (historyPropertySelect) {

    historyPropertySelect.addEventListener(
        "change",
        async function () {

            // Invalidate any previous history request.

            historyRequestId++;


            // Clear previous results.

            historyAssignments = [];

            historyResidentNames = new Map();

            historyDocsByAssignment = new Map();

            historyResults.replaceChildren();


            // Load floors for selected property.

            await loadHistoryFloors();


            // Show search instructions unless loading failed.

            if (
                historyPropertySelect.value &&
                !historyFloorSelect.disabled
            ) {

                showHistoryTranslatedMessage(
                    "historySearchPrompt",
                    "Velg bolig og etasje for å søke.",
                    "Select a property and floor to search."
                );

            } else if (!historyPropertySelect.value) {

                showHistoryTranslatedMessage(
                    "historySelectPropertyFirst",
                    "Velg en bolig først.",
                    "Select a property first."
                );

            }

            historySearchButton.disabled =
                !historyPropertySelect.value;

        }
    );

}


// ============================================================
// FLOOR CHANGE
// ============================================================

if (historyFloorSelect) {

    historyFloorSelect.addEventListener(
        "change",
        function () {

            // Invalidate any pending history request.

            historyRequestId++;


            // Clear results for previous floor.

            historyAssignments = [];

            historyResidentNames = new Map();

            historyDocsByAssignment = new Map();

            historyResults.replaceChildren();


            // Prompt the user to search again.

            showHistoryTranslatedMessage(
                "historySearchPrompt",
                "Velg bolig og etasje for å søke.",
                "Select a property and floor to search."
            );

        }
    );

}


// ============================================================
// SEARCH FORM
// ============================================================

if (historyFilterForm) {

    historyFilterForm.addEventListener(
        "submit",
        async function (event) {

            event.preventDefault();

            await loadCleaningHistory();

        }
    );

}


// ============================================================
// SIDEBAR - LOGOUT
// ============================================================

const historyLogoutButton =
    document.getElementById("sidebarLogoutButton");

if (historyLogoutButton) {

    historyLogoutButton.addEventListener(
        "click",
        async function () {

            const { error } =
                await supabaseClient.auth.signOut();

            if (error) {

                showHistoryTranslatedMessage(
                    "historyLogoutError",
                    "Kunne ikke logge ut: {error}",
                    "Could not log out: {error}",
                    {
                        error: error.message
                    }
                );

                return;

            }

            window.location.replace(
                "index.html"
            );

        }
    );

}


// ============================================================
// SIDEBAR - SETTINGS
// ============================================================

const historySettingsButton =
    document.getElementById(
        "settingsSidebarButton"
    );

if (historySettingsButton) {

    historySettingsButton.addEventListener(
        "click",
        function () {

            window.alert(
                historyText(
                    "adminSettingsComingSoon",
                    "Innstillinger kommer i et senere steg.",
                    "Settings are coming in a later update."
                )
            );

        }
    );

}


// ============================================================
// INITIALIZE ADMIN HISTORY
// ============================================================

initializeAdminHistory();

