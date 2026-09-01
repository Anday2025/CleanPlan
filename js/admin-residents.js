// ============================================================
// CLEANING APP
// RESIDENTS
// ============================================================


// ============================================================
// ELEMENTS
// ============================================================

const residentForm =
    document.getElementById("residentForm");

const residentProfileSelect =
    document.getElementById("residentProfile");

const residentPropertySelect =
    document.getElementById("residentProperty");

const residentFloorSelect =
    document.getElementById("residentFloor");

const saveResidentButton =
    document.getElementById("saveResidentButton");

const residentMessage =
    document.getElementById("residentMessage");

const residentList =
    document.getElementById("residentList");

const logoutButton =
    document.getElementById("logoutButton");

const backButton =
    document.getElementById("backButton");


// ============================================================
// RESIDENT LIST / SEARCH ELEMENTS
// ============================================================

const registeredResidentsContent =
    document.getElementById(
        "registeredResidentsContent"
    );

const toggleResidentsButton =
    document.getElementById(
        "toggleResidentsButton"
    );

const toggleResidentsText =
    document.getElementById(
        "toggleResidentsText"
    );

const toggleResidentsIcon =
    document.getElementById(
        "toggleResidentsIcon"
    );

const residentCountBadge =
    document.getElementById(
        "residentCountBadge"
    );

const residentSearchInput =
    document.getElementById(
        "residentSearchInput"
    );

const clearResidentSearchButton =
    document.getElementById(
        "clearResidentSearchButton"
    );

const residentSearchCount =
    document.getElementById(
        "residentSearchCount"
    );

const residentSearchEmpty =
    document.getElementById(
        "residentSearchEmpty"
    );


// ============================================================
// CURRENT USER
// ============================================================

let currentSession = null;
let currentProfile = null;


// ============================================================
// RESIDENT LIST STATE
// ============================================================

let activeResidentCount = 0;


// ============================================================
// MESSAGE
// ============================================================

function showResidentMessage(
    message,
    type = ""
) {

    if (!residentMessage) {
        return;
    }


    residentMessage.textContent =
        message;

    residentMessage.className =
        "message " + type;

}


// ============================================================
// LOGOUT
// ============================================================

if (logoutButton) {

    logoutButton.addEventListener(
        "click",
        async function () {

            await supabaseClient.auth.signOut();

            window.location.href =
                "index.html";

        }
    );

}


// ============================================================
// BACK TO DASHBOARD
// ============================================================

if (backButton) {

    backButton.addEventListener(
        "click",
        function () {

            window.location.href =
                "admin.html";

        }
    );

}


// ============================================================
// RESIDENT WORD
// ============================================================

function getResidentWord(
    count
) {

    return count === 1
        ? "beboer"
        : "beboere";

}


// ============================================================
// UPDATE TOGGLE BUTTON
// ============================================================

function updateResidentsToggleButton() {

    if (
        !toggleResidentsButton ||
        !registeredResidentsContent
    ) {
        return;
    }


    const isOpen =
        !registeredResidentsContent.hidden;


    if (toggleResidentsText) {

        toggleResidentsText.textContent =
            (
                isOpen
                    ? "Skjul beboere"
                    : "Vis beboere"
            ) +
            ` (${activeResidentCount})`;

    }


    if (toggleResidentsIcon) {

        toggleResidentsIcon.textContent =
            isOpen
                ? "⌃"
                : "⌄";

    }


    toggleResidentsButton.setAttribute(
        "aria-expanded",
        isOpen
            ? "true"
            : "false"
    );

}


// ============================================================
// OPEN / CLOSE RESIDENT LIST
// ============================================================

function setResidentListOpen(
    shouldOpen
) {

    if (!registeredResidentsContent) {
        return;
    }


    registeredResidentsContent.hidden =
        !shouldOpen;


    updateResidentsToggleButton();


    if (
        shouldOpen &&
        residentSearchInput
    ) {

        window.setTimeout(
            function () {

                residentSearchInput.focus();

            },
            50
        );

    }

}


// ============================================================
// UPDATE SEARCH RESULT TEXT
// ============================================================

function updateResidentSearchCount(
    visibleCount
) {

    if (!residentSearchCount) {
        return;
    }


    residentSearchCount.textContent =
        `${visibleCount} ` +
        `${getResidentWord(visibleCount)} funnet`;

}


// ============================================================
// FILTER RESIDENTS
// ============================================================

function filterResidentList() {

    if (!residentList) {
        return;
    }


    const query =
        residentSearchInput
            ? residentSearchInput.value
                .trim()
                .toLocaleLowerCase(
                    "nb-NO"
                )
            : "";


    const rows =
        Array.from(
            residentList.querySelectorAll(
                ".admin-resident-row"
            )
        );


    let visibleCount = 0;


    rows.forEach(
        function (row) {

            const searchableText =
                (
                    row.dataset.searchText ||
                    row.textContent ||
                    ""
                )
                    .toLocaleLowerCase(
                        "nb-NO"
                    );


            const matches =
                !query ||
                searchableText.includes(
                    query
                );


            row.hidden =
                !matches;


            if (matches) {

                visibleCount += 1;

            }

        }
    );


    if (clearResidentSearchButton) {

        clearResidentSearchButton.hidden =
            query.length === 0;

    }


    if (residentSearchEmpty) {

        residentSearchEmpty.hidden =
            !(
                query &&
                rows.length > 0 &&
                visibleCount === 0
            );

    }


    updateResidentSearchCount(
        query
            ? visibleCount
            : activeResidentCount
    );

}


// ============================================================
// TOGGLE RESIDENT LIST
// ============================================================

if (toggleResidentsButton) {

    toggleResidentsButton.addEventListener(
        "click",
        function () {

            if (!registeredResidentsContent) {
                return;
            }


            setResidentListOpen(
                registeredResidentsContent.hidden
            );

        }
    );

}


// ============================================================
// SEARCH RESIDENTS
// ============================================================

if (residentSearchInput) {

    residentSearchInput.addEventListener(
        "input",
        filterResidentList
    );

}


// ============================================================
// CLEAR RESIDENT SEARCH
// ============================================================

if (clearResidentSearchButton) {

    clearResidentSearchButton.addEventListener(
        "click",
        function () {

            if (!residentSearchInput) {
                return;
            }


            residentSearchInput.value =
                "";


            filterResidentList();


            residentSearchInput.focus();

        }
    );

}


// ============================================================
// AUTH + ADMIN CHECK
// ============================================================

async function checkAdmin() {

    const {
        data: {
            session
        },
        error: sessionError
    } =
        await supabaseClient.auth.getSession();


    if (
        sessionError ||
        !session
    ) {

        window.location.href =
            "index.html";

        return null;

    }


    const {
        data: profile,
        error
    } =
        await supabaseClient
            .from("profiles")
            .select(
                "full_name, role, is_active"
            )
            .eq(
                "id",
                session.user.id
            )
            .single();


    if (
        error ||
        !profile
    ) {

        console.error(
            "PROFILE ERROR:",
            error
        );


        await supabaseClient.auth.signOut();


        window.location.href =
            "index.html";


        return null;

    }


    if (
        !profile.is_active ||
        (
            profile.role !==
            "superadmin" &&
            profile.role !==
            "admin"
        )
    ) {

        await supabaseClient.auth.signOut();


        window.location.href =
            "index.html";


        return null;

    }


    const adminName =
        document.getElementById(
            "adminName"
        );


    if (adminName) {

        adminName.textContent =
            profile.full_name;

    }


    const adminInitial =
        document.getElementById(
            "adminInitial"
        );


    if (
        adminInitial &&
        profile.full_name
    ) {

        adminInitial.textContent =
            profile.full_name
                .trim()
                .charAt(0)
                .toUpperCase();

    }


    currentSession =
        session;

    currentProfile =
        profile;


    return {
        session,
        profile
    };

}


// ============================================================
// LOAD USER PROFILES
// ============================================================

async function loadUserProfiles() {

    if (!residentProfileSelect) {
        return;
    }


    residentProfileSelect.innerHTML = `

        <option value="">
            Laster brukerprofiler...
        </option>

    `;


    const {
        data,
        error
    } =
        await supabaseClient
            .from("profiles")
            .select(
                "id, full_name, email, role, is_active"
            )
            .eq(
                "is_active",
                true
            )
            .order(
                "full_name",
                {
                    ascending: true
                }
            );


    if (error) {

        console.error(
            "LOAD PROFILES ERROR:",
            error
        );


        residentProfileSelect.innerHTML = `

            <option value="">
                Kunne ikke hente brukerprofiler
            </option>

        `;


        return;

    }


    const profiles =
        (data || []).filter(
            profile =>
                profile.role ===
                "resident"
        );


    if (
        profiles.length === 0
    ) {

        residentProfileSelect.innerHTML = `

            <option value="">
                Ingen aktive beboerbrukere
            </option>

        `;


        return;

    }


    residentProfileSelect.innerHTML = `

        <option value="">
            Velg brukerprofil
        </option>

    ` +
        profiles.map(
            profile => `

                <option value="${profile.id}">
                    ${escapeHtml(
                profile.full_name
            )}
                    — ${escapeHtml(
                profile.email
            )}
                </option>

            `
        ).join("");

}


// ============================================================
// LOAD PROPERTIES
// ============================================================

async function loadProperties() {

    if (!residentPropertySelect) {
        return;
    }


    residentPropertySelect.innerHTML = `

        <option value="">
            Laster boliger...
        </option>

    `;


    const {
        data,
        error
    } =
        await supabaseClient
            .from("properties")
            .select(
                "id, name, address, floor_count"
            )
            .eq(
                "is_active",
                true
            )
            .order(
                "name",
                {
                    ascending: true
                }
            );


    if (error) {

        console.error(
            "LOAD PROPERTIES ERROR:",
            error
        );


        residentPropertySelect.innerHTML = `

            <option value="">
                Kunne ikke hente boliger
            </option>

        `;


        return;

    }


    if (
        !data ||
        data.length === 0
    ) {

        residentPropertySelect.innerHTML = `

            <option value="">
                Ingen boliger tilgjengelig
            </option>

        `;


        return;

    }


    residentPropertySelect.innerHTML = `

        <option value="">
            Velg bolig
        </option>

    ` +
        data.map(
            property => `

                <option value="${property.id}">
                    ${escapeHtml(
                property.name
            )}
                    — ${escapeHtml(
                property.address
            )}
                </option>

            `
        ).join("");

}


// ============================================================
// LOAD FLOORS
// ============================================================

async function loadFloors(
    propertyId
) {

    if (!residentFloorSelect) {
        return;
    }


    residentFloorSelect.disabled =
        true;


    if (!propertyId) {

        residentFloorSelect.innerHTML = `

            <option value="">
                Velg bolig først
            </option>

        `;


        return;

    }


    residentFloorSelect.innerHTML = `

        <option value="">
            Laster etasjer...
        </option>

    `;


    const {
        data,
        error
    } =
        await supabaseClient
            .from("floors")
            .select(
                "id, floor_number, name"
            )
            .eq(
                "property_id",
                propertyId
            )
            .order(
                "floor_number",
                {
                    ascending: true
                }
            );


    if (error) {

        console.error(
            "LOAD FLOORS ERROR:",
            error
        );


        residentFloorSelect.innerHTML = `

            <option value="">
                Kunne ikke hente etasjer
            </option>

        `;


        return;

    }


    if (
        !data ||
        data.length === 0
    ) {

        residentFloorSelect.innerHTML = `

            <option value="">
                Ingen etasjer tilgjengelig
            </option>

        `;


        return;

    }


    residentFloorSelect.innerHTML = `

        <option value="">
            Velg etasje
        </option>

    ` +
        data.map(
            floor => `

                <option value="${floor.id}">
                    ${escapeHtml(
                floor.name ||
                `${floor.floor_number}. etasje`
            )}
                </option>

            `
        ).join("");


    residentFloorSelect.disabled =
        false;

}


// ============================================================
// PROPERTY CHANGE
// ============================================================

if (residentPropertySelect) {

    residentPropertySelect.addEventListener(
        "change",
        async function () {

            const propertyId =
                residentPropertySelect.value;


            await loadFloors(
                propertyId
            );

        }
    );

}


// ============================================================
// LOAD RESIDENTS
// ============================================================

async function loadResidents() {

    if (!residentList) {
        return;
    }


    residentList.innerHTML = `

        <p class="empty-state">
            Laster beboere...
        </p>

    `;


    const {
        data,
        error
    } =
        await supabaseClient
            .from("residents")
            .select(`
                id,
                profile_id,
                property_id,
                floor_id,
                is_active,
                created_at,

                profiles (
                    full_name,
                    email
                ),

                properties (
                    name,
                    address
                ),

                floors (
                    floor_number,
                    name
                )
            `)
            .eq(
                "is_active",
                true
            )
            .order(
                "created_at",
                {
                    ascending: false
                }
            );


    if (error) {

        console.error(
            "LOAD RESIDENTS ERROR:",
            error
        );


        activeResidentCount =
            0;


        if (residentCountBadge) {

            residentCountBadge.textContent =
                "0";

        }


        updateResidentsToggleButton();


        updateResidentSearchCount(
            0
        );


        residentList.innerHTML = `

            <p class="message error">
                Kunne ikke hente beboere.
            </p>

        `;


        return;

    }


    const residents =
        data || [];


    activeResidentCount =
        residents.length;


    if (residentCountBadge) {

        residentCountBadge.textContent =
            String(
                activeResidentCount
            );

    }


    updateResidentsToggleButton();


    updateResidentSearchCount(
        activeResidentCount
    );


    if (
        residents.length === 0
    ) {

        residentList.innerHTML = `

            <p class="empty-state">
                Ingen beboere er registrert ennå.
            </p>

        `;


        if (residentSearchEmpty) {

            residentSearchEmpty.hidden =
                true;

        }


        return;

    }


    residentList.innerHTML =
        residents.map(
            resident => {

                const profile =
                    resident.profiles;

                const property =
                    resident.properties;

                const floor =
                    resident.floors;


                const residentName =
                    profile
                        ? profile.full_name
                        : "Ukjent bruker";


                const residentEmail =
                    profile
                        ? profile.email
                        : "";


                const propertyName =
                    property
                        ? property.name
                        : "Ukjent bolig";


                const propertyAddress =
                    property
                        ? property.address
                        : "";


                const floorName =
                    floor
                        ? (
                            floor.name ||
                            `${floor.floor_number}. etasje`
                        )
                        : "Ingen etasje";


                const searchText =
                    (
                        residentName +
                        " " +
                        residentEmail +
                        " " +
                        propertyName +
                        " " +
                        propertyAddress +
                        " " +
                        floorName
                    )
                        .trim()
                        .toLocaleLowerCase(
                            "nb-NO"
                        );


                return `

                    <div
                        class="property-row admin-resident-row"
                        data-search-text="${escapeHtml(
                    searchText
                )}"
                    >

                        <div class="property-content">

                            <h3>
                                👤 ${escapeHtml(
                    residentName
                )}
                            </h3>


                            <p>
                                ${escapeHtml(
                    residentEmail
                )}
                            </p>


                            <div class="property-meta">

                                <span>
                                    🏠 ${escapeHtml(
                    propertyName
                )}
                                </span>

                                <span>
                                    ${escapeHtml(
                    floorName
                )}
                                </span>

                            </div>

                        </div>


                        <div class="property-actions">

                            <span class="status-active">
                                Aktiv
                            </span>

                        </div>

                    </div>

                `;

            }
        ).join("");


    filterResidentList();

}


// ============================================================
// CREATE RESIDENT
// ============================================================

if (residentForm) {

    residentForm.addEventListener(
        "submit",
        async function (event) {

            event.preventDefault();


            const profileId =
                residentProfileSelect
                    ? residentProfileSelect.value
                    : "";

            const propertyId =
                residentPropertySelect
                    ? residentPropertySelect.value
                    : "";

            const floorId =
                residentFloorSelect
                    ? residentFloorSelect.value
                    : "";


            if (
                !profileId ||
                !propertyId ||
                !floorId
            ) {

                showResidentMessage(
                    "Velg brukerprofil, bolig og etasje.",
                    "error"
                );


                return;

            }


            if (saveResidentButton) {

                saveResidentButton.disabled =
                    true;

                saveResidentButton.textContent =
                    "Oppretter...";

            }


            showResidentMessage(
                ""
            );


            const {
                error
            } =
                await supabaseClient
                    .from("residents")
                    .insert({

                        profile_id:
                        profileId,

                        property_id:
                        propertyId,

                        floor_id:
                        floorId,

                        is_active:
                            true

                    });


            if (error) {

                console.error(
                    "CREATE RESIDENT ERROR:",
                    error
                );


                if (
                    error.code ===
                    "23505"
                ) {

                    showResidentMessage(
                        "Denne brukeren er allerede registrert.",
                        "error"
                    );

                } else {

                    showResidentMessage(
                        "Kunne ikke opprette beboer.",
                        "error"
                    );

                }


                if (saveResidentButton) {

                    saveResidentButton.disabled =
                        false;

                    saveResidentButton.textContent =
                        "Opprett beboer";

                }


                return;

            }


            showResidentMessage(
                "Beboeren ble opprettet.",
                "success"
            );


            residentForm.reset();


            if (residentFloorSelect) {

                residentFloorSelect.innerHTML = `

                    <option value="">
                        Velg bolig først
                    </option>

                `;


                residentFloorSelect.disabled =
                    true;

            }


            /*
             * Reload list.
             * This automatically updates:
             * - resident count
             * - toggle button count
             * - search results
             */

            await loadResidents();


            /*
             * Refresh available resident profiles too.
             */

            await loadUserProfiles();


            if (saveResidentButton) {

                saveResidentButton.disabled =
                    false;

                saveResidentButton.textContent =
                    "Opprett beboer";

            }

        }
    );

}


// ============================================================
// ESCAPE HTML
// ============================================================

function escapeHtml(
    value
) {

    const div =
        document.createElement(
            "div"
        );


    div.textContent =
        value ?? "";


    return div.innerHTML;

}


// ============================================================
// START
// ============================================================

async function initResidentsPage() {

    const result =
        await checkAdmin();


    if (!result) {

        return;

    }


    /*
     * Keep registered residents collapsed
     * when the page first opens.
     */

    setResidentListOpen(
        false
    );


    await Promise.all([

        loadUserProfiles(),

        loadProperties(),

        loadResidents()

    ]);


    updateResidentsToggleButton();


    filterResidentList();

}


initResidentsPage();