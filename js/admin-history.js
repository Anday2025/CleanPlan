
"use strict";

// ============================================================
// CLEANPLAN - ADMIN HISTORY
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
// HELPERS
// ============================================================

function showHistoryMessage(message) {

    historyMessage.textContent = message;

}


function addSelectOption(select, value, label) {

    const option = document.createElement("option");

    option.value = value;
    option.textContent = label;

    select.appendChild(option);

}


function getHistoryStatus(status) {

    const translations = {
        pending: "Venter",
        completed: "Fullført",
        skipped: "Hoppet over",
        cancelled: "Avbrutt"
    };

    return translations[status] || status || "Ukjent";

}


// ============================================================
// LOAD AUTHORIZED FLOORS
// ============================================================

async function loadHistoryFloors() {

    const propertyId = historyPropertySelect.value;

    historyFloorSelect.replaceChildren();

    addSelectOption(
        historyFloorSelect,
        "",
        "Alle etasjer"
    );

    historyFloorSelect.disabled = true;

    if (!propertyId) {
        return;
    }

    const { data, error } = await supabaseClient
        .from("floors")
        .select("id, name, floor_number")
        .eq("property_id", propertyId)
        .order("floor_number", { ascending: true });

    if (error) {

        showHistoryMessage(
            "Kunne ikke hente etasjer: " + error.message
        );

        return;

    }

    for (const floor of data || []) {

        addSelectOption(
            historyFloorSelect,
            floor.id,
            floor.name || `Etasje ${floor.floor_number}`
        );

    }

    historyFloorSelect.disabled = false;

}


// ============================================================
// LOAD AUTHORIZED PROPERTIES
// ============================================================

async function loadHistoryProperties() {

    const { data, error } = await supabaseClient
        .from("properties")
        .select("id, name, address")
        .order("name", { ascending: true });

    if (error) {

        showHistoryMessage(
            "Kunne ikke hente boliger: " + error.message
        );

        return;

    }

    historyPropertySelect.replaceChildren();

    addSelectOption(
        historyPropertySelect,
        "",
        "Velg bolig"
    );

    for (const property of data || []) {

        addSelectOption(
            historyPropertySelect,
            property.id,
            property.name || property.address || "Bolig"
        );

    }

    if (!data || data.length === 0) {

        showHistoryMessage(
            "Ingen boliger er tilgjengelige for denne kontoen."
        );

        return;

    }

    historyPropertySelect.disabled = false;
    historySearchButton.disabled = false;

    showHistoryMessage(
        "Velg bolig og etasje for å søke."
    );

}


// ============================================================
// AUTHORIZATION
// ============================================================

async function initializeAdminHistory() {

    const { data: authData, error: authError } =
        await supabaseClient.auth.getUser();

    const user = authData?.user;

    if (authError || !user) {

        window.location.replace("index.html");

        return;

    }

    const { data: profile, error: profileError } =
        await supabaseClient
            .from("profiles")
            .select("role, is_active")
            .eq("id", user.id)
            .single();

    if (
        profileError ||
        !profile ||
        !profile.is_active ||
        !["admin", "superadmin"].includes(profile.role)
    ) {

        showHistoryMessage(
            "Du har ikke tilgang til denne siden."
        );

        return;

    }

    await loadHistoryProperties();

}


// ============================================================
// LOAD RESIDENT NAMES
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

    const { data: residents, error: residentsError } =
        await supabaseClient
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

        const { data: profiles, error: profilesError } =
            await supabaseClient
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
            profileNames.get(resident.profile_id) ||
            "Ukjent beboer"
        );

    }

    return residentNames;

}


// ============================================================
// LOAD CLEANING HISTORY
// ============================================================

async function loadCleaningHistory() {

    const propertyId = historyPropertySelect.value;
    const floorId = historyFloorSelect.value;

    if (!propertyId) {

        showHistoryMessage("Velg en bolig først.");

        return;

    }

    historySearchButton.disabled = true;

    historyResults.replaceChildren();

    showHistoryMessage(
        "Henter rengjøringshistorikk ..."
    );

    try {

        // ====================================================
        // CLEANING PLANS
        // ====================================================

        let plansQuery = supabaseClient
            .from("cleaning_plans")
            .select("id, floor_id")
            .eq("property_id", propertyId);

        if (floorId) {

            plansQuery =
                plansQuery.eq("floor_id", floorId);

        }

        const { data: plans, error: plansError } =
            await plansQuery;

        if (plansError) {
            throw plansError;
        }

        if (!plans || plans.length === 0) {

            showHistoryMessage(
                "Ingen rengjøringsplaner funnet."
            );

            return;

        }

        const planIds =
            plans.map(plan => plan.id);


        // ====================================================
        // CLEANING ASSIGNMENTS
        // ====================================================

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

        if (!assignments || assignments.length === 0) {

            showHistoryMessage(
                "Ingen rengjøringshistorikk funnet."
            );

            return;

        }


        // ====================================================
        // RESIDENT NAMES
        // ====================================================

        let residentNames = new Map();

        try {

            residentNames =
                await loadHistoryResidentNames(assignments);

        } catch (residentError) {

            console.error(
                "Could not load resident names:",
                residentError
            );

            // Continue showing history even if
            // profile access is restricted by RLS.

        }


        // ====================================================
        // DOCUMENTATION
        // ====================================================

        const assignmentIds =
            assignments.map(item => item.id);

        const {
            data: documentation,
            error: documentationError
        } = await supabaseClient
            .from("cleaning_documentation")
            .select(
                "id, assignment_id, storage_path, " +
                "file_name, created_at"
            )
            .in("assignment_id", assignmentIds);

        if (documentationError) {
            throw documentationError;
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
                .push(doc);

        }


        // ====================================================
        // RENDER HISTORY
        // ====================================================

        for (const assignment of assignments) {

            const article =
                document.createElement("article");

            article.className = "history-entry";


            // WEEK

            const heading =
                document.createElement("h3");

            heading.textContent =
                "Rengjøring – " + assignment.week_start;

            article.appendChild(heading);


            // RESIDENT

            const resident =
                document.createElement("p");

            let residentName = "Ikke tildelt";

            if (assignment.resident_id) {

                residentName =
                    residentNames.get(
                        assignment.resident_id
                    ) || "Ukjent beboer";

            }

            resident.textContent =
                "Ansvarlig beboer: " + residentName;

            article.appendChild(resident);


            // STATUS

            const status =
                document.createElement("p");

            status.textContent =
                "Status: " +
                getHistoryStatus(assignment.status);

            article.appendChild(status);


            // SIGNATURE

            const signature =
                document.createElement("p");

            signature.textContent =
                assignment.signed_at
                    ? "Signert: " +
                    new Date(
                        assignment.signed_at
                    ).toLocaleString("nb-NO")
                    : "Ikke signert";

            article.appendChild(signature);


            // DOCUMENTATION

            const docs =
                docsByAssignment.get(
                    assignment.id
                ) || [];

            const docHeading =
                document.createElement("p");

            docHeading.textContent =
                "Dokumentasjonsbilder: " +
                docs.length;

            article.appendChild(docHeading);



            // ====================================================
            // DOCUMENTATION IMAGE GALLERY
            // ====================================================

            if (docs.length > 0) {

                const gallery =
                    document.createElement("div");

                gallery.className = "history-image-gallery";

                article.appendChild(gallery);

                for (const doc of docs) {

                    if (!doc.storage_path) {
                        continue;
                    }

                    const image =
                        document.createElement("img");

                    image.className = "history-image";

                    image.alt =
                        doc.file_name ||
                        "Dokumentasjonsbilde";

                    image.loading = "lazy";

                    // Show images directly from Supabase Storage.

                    const { data, error } =
                        await supabaseClient
                            .storage
                            .from("cleaning-documentation")
                            .createSignedUrl(
                                doc.storage_path,
                                3600
                            );

                    if (error || !data?.signedUrl) {

                        console.error(
                            "Could not load documentation image:",
                            error
                        );

                        continue;
                    }

                    image.src = data.signedUrl;


                    // OPEN FULL-SIZE IMAGE ON CLICK

                    image.addEventListener(
                        "click",
                        function () {

                            const images = Array.from(
                                gallery.querySelectorAll(".history-image")
                            );

                            const imageUrls = images.map(img => img.src);

                            const selectedIndex = images.indexOf(image);

                            openHistoryImage(imageUrls, selectedIndex);

                        }
                    );


                    gallery.appendChild(image);

                }

            }


            historyResults.appendChild(article);

        }


        // ====================================================
        // RESULT MESSAGE
        // ====================================================

        showHistoryMessage(
            "Viser " +
            assignments.length +
            " loggoppføringer."
        );

    } catch (error) {

        console.error(
            "History error:",
            error
        );

        showHistoryMessage(
            "Kunne ikke hente loggen: " +
            error.message
        );

    } finally {

        historySearchButton.disabled = false;

    }

}


// ============================================================
// FULL-SIZE IMAGE VIEWER WITH NAVIGATION
// ============================================================

function openHistoryImage(imageUrls, startIndex = 0) {

    if (!imageUrls || imageUrls.length === 0) {
        return;
    }

    let currentIndex = startIndex;

    const overlay = document.createElement("div");
    overlay.className = "history-image-overlay";
    overlay.setAttribute("role", "dialog");
    overlay.setAttribute("aria-modal", "true");
    overlay.setAttribute("aria-label", "Dokumentasjonsbilder");

    const fullImage = document.createElement("img");
    fullImage.className = "history-full-image";
    fullImage.alt = "Dokumentasjonsbilde";

    const closeButton = document.createElement("button");
    closeButton.type = "button";
    closeButton.className = "history-image-close";
    closeButton.textContent = "×";
    closeButton.setAttribute("aria-label", "Lukk bilde");

    const previousButton = document.createElement("button");
    previousButton.type = "button";
    previousButton.className =
        "history-image-nav history-image-prev";
    previousButton.textContent = "‹";
    previousButton.setAttribute(
        "aria-label",
        "Forrige bilde"
    );

    const nextButton = document.createElement("button");
    nextButton.type = "button";
    nextButton.className =
        "history-image-nav history-image-next";
    nextButton.textContent = "›";
    nextButton.setAttribute(
        "aria-label",
        "Neste bilde"
    );

    const counter = document.createElement("div");
    counter.className = "history-image-counter";

    function showImage() {

        fullImage.src = imageUrls[currentIndex];

        fullImage.alt =
            `Dokumentasjonsbilde ${currentIndex + 1}`;

        counter.textContent =
            `${currentIndex + 1} / ${imageUrls.length}`;

        previousButton.disabled = currentIndex === 0;
        nextButton.disabled =
            currentIndex === imageUrls.length - 1;

    }

    function previousImage() {

        if (currentIndex > 0) {
            currentIndex--;
            showImage();
        }

    }

    function nextImage() {

        if (currentIndex < imageUrls.length - 1) {
            currentIndex++;
            showImage();
        }

    }

    function closeImage() {

        document.removeEventListener(
            "keydown",
            handleKeydown
        );

        overlay.remove();

    }

    function handleKeydown(event) {

        if (event.key === "Escape") {
            closeImage();
        }

        if (event.key === "ArrowLeft") {
            previousImage();
        }

        if (event.key === "ArrowRight") {
            nextImage();
        }

    }

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

    overlay.addEventListener(
        "click",
        function (event) {

            if (event.target === overlay) {
                closeImage();
            }

        }
    );

    document.addEventListener(
        "keydown",
        handleKeydown
    );

    overlay.appendChild(closeButton);
    overlay.appendChild(previousButton);
    overlay.appendChild(fullImage);
    overlay.appendChild(nextButton);
    overlay.appendChild(counter);

    document.body.appendChild(overlay);

    showImage();

}




// ============================================================
// EVENTS
// ============================================================

historyPropertySelect.addEventListener(
    "change",
    async function () {

        historyResults.replaceChildren();

        await loadHistoryFloors();

    }
);


historyFilterForm.addEventListener(
    "submit",
    async function (event) {

        event.preventDefault();

        await loadCleaningHistory();

    }
);


// ============================================================
// START
// ============================================================



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
                showHistoryMessage(
                    "Kunne ikke logge ut: " + error.message
                );
                return;
            }

            window.location.replace("index.html");

        }
    );

}


// ============================================================
// SIDEBAR - SETTINGS
// ============================================================

const historySettingsButton =
    document.getElementById("settingsSidebarButton");

if (historySettingsButton) {

    historySettingsButton.addEventListener(
        "click",
        function () {

            window.alert(
                "Innstillinger kommer i et senere steg."
            );

        }
    );

}


initializeAdminHistory();
