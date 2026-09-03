// ============================================================
// CLEANPLAN
// ADMIN RESIDENTS
// ============================================================


// ============================================================
// ELEMENTS
// ============================================================

const residentForm =
    document.getElementById(
        "residentForm"
    );

const residentProfileSelect =
    document.getElementById(
        "residentProfile"
    );

const residentPropertySelect =
    document.getElementById(
        "residentProperty"
    );

const residentFloorSelect =
    document.getElementById(
        "residentFloor"
    );

const saveResidentButton =
    document.getElementById(
        "saveResidentButton"
    );

const residentMessage =
    document.getElementById(
        "residentMessage"
    );

const residentList =
    document.getElementById(
        "residentList"
    );

const logoutButton =
    document.getElementById(
        "logoutButton"
    );

const backButton =
    document.getElementById(
        "backButton"
    );


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

let currentSession =
    null;

let currentProfile =
    null;


// ============================================================
// DATA CACHE
// ============================================================

let availableResidentProfiles =
    [];

let availableProperties =
    [];

let currentPropertyFloors =
    [];

let currentResidents =
    [];


// ============================================================
// RESIDENT LIST STATE
// ============================================================

let activeResidentCount =
    0;


// ============================================================
// I18N HELPER
// ============================================================

function t(
    key,
    params = {},
    fallback = ""
) {

    if (
        window.CleanPlanI18n &&
        typeof window.CleanPlanI18n.t ===
        "function"
    ) {

        const translated =
            window.CleanPlanI18n.t(
                key,
                params
            );


        if (
            translated &&
            translated !==
            key
        ) {

            return translated;

        }

    }


    let text =
        fallback ||
        key;


    Object.entries(
        params
    ).forEach(
        function (
            [paramKey, value]
        ) {

            text =
                text.replaceAll(
                    "{" +
                    paramKey +
                    "}",
                    String(value)
                );

        }
    );


    return text;

}


// ============================================================
// CURRENT LANGUAGE
// ============================================================

function getCurrentLanguageCode() {

    if (
        window.CleanPlanI18n &&
        typeof window.CleanPlanI18n.getLanguage ===
        "function"
    ) {

        return (
            window.CleanPlanI18n.getLanguage() ||
            "no"
        );

    }


    return "no";

}


// ============================================================
// CURRENT LOCALE
// ============================================================

function getCurrentLocale() {

    return (
        getCurrentLanguageCode() ===
        "en"
            ? "en-GB"
            : "nb-NO"
    );

}


// ============================================================
// MESSAGE
// ============================================================

function showResidentMessage(
    message,
    type = ""
) {

    if (
        !residentMessage
    ) {

        return;

    }


    residentMessage.textContent =
        message;


    residentMessage.className =
        "message " +
        type;

}


// ============================================================
// LOGOUT
// ============================================================

if (
    logoutButton
) {

    logoutButton.addEventListener(
        "click",
        async function () {

            await supabaseClient
                .auth
                .signOut();


            window.location.href =
                "index.html";

        }
    );

}


// ============================================================
// BACK TO DASHBOARD
// ============================================================

if (
    backButton
) {

    backButton.addEventListener(
        "click",
        function () {

            window.location.href =
                "admin.html";

        }
    );

}


// ============================================================
// UPDATE RESIDENT TOGGLE BUTTON
// ============================================================

function updateResidentsToggleButton() {

    if (
        !toggleResidentsButton ||
        !registeredResidentsContent
    ) {

        return;

    }


    const isOpen =
        !registeredResidentsContent
            .hidden;


    if (
        toggleResidentsText
    ) {

        toggleResidentsText.textContent =
            (
                isOpen
                    ? t(
                        "adminHideResidents",
                        {},
                        "Skjul beboere"
                    )
                    : t(
                        "adminShowResidents",
                        {},
                        "Vis beboere"
                    )
            ) +
            " (" +
            activeResidentCount +
            ")";

    }


    if (
        toggleResidentsIcon
    ) {

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

    if (
        !registeredResidentsContent
    ) {

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

    if (
        !residentSearchCount
    ) {

        return;

    }


    residentSearchCount.textContent =
        visibleCount ===
        1
            ? t(
                "adminResidentSingularFound",
                {
                    count:
                    visibleCount
                },
                visibleCount +
                " beboer funnet"
            )
            : t(
                "adminResidentPluralFound",
                {
                    count:
                    visibleCount
                },
                visibleCount +
                " beboere funnet"
            );

}


// ============================================================
// FILTER RESIDENTS
// ============================================================

function filterResidentList() {

    if (
        !residentList
    ) {

        return;

    }


    const query =
        residentSearchInput
            ? residentSearchInput
                .value
                .trim()
                .toLocaleLowerCase(
                    getCurrentLocale()
                )
            : "";


    const rows =
        Array.from(
            residentList
                .querySelectorAll(
                    ".admin-resident-row"
                )
        );


    let visibleCount =
        0;


    rows.forEach(
        function (
            row
        ) {

            const searchableText =
                (
                    row.dataset
                        .searchText ||
                    row.textContent ||
                    ""
                )
                    .toLocaleLowerCase(
                        getCurrentLocale()
                    );


            const matches =
                !query ||
                searchableText.includes(
                    query
                );


            row.hidden =
                !matches;


            if (
                matches
            ) {

                visibleCount +=
                    1;

            }

        }
    );


    if (
        clearResidentSearchButton
    ) {

        clearResidentSearchButton.hidden =
            query.length ===
            0;

    }


    if (
        residentSearchEmpty
    ) {

        residentSearchEmpty.hidden =
            !(
                query &&
                rows.length >
                0 &&
                visibleCount ===
                0
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

if (
    toggleResidentsButton
) {

    toggleResidentsButton.addEventListener(
        "click",
        function () {

            if (
                !registeredResidentsContent
            ) {

                return;

            }


            setResidentListOpen(
                registeredResidentsContent
                    .hidden
            );

        }
    );

}


// ============================================================
// SEARCH RESIDENTS
// ============================================================

if (
    residentSearchInput
) {

    residentSearchInput.addEventListener(
        "input",
        filterResidentList
    );

}


// ============================================================
// CLEAR RESIDENT SEARCH
// ============================================================

if (
    clearResidentSearchButton
) {

    clearResidentSearchButton.addEventListener(
        "click",
        function () {

            if (
                !residentSearchInput
            ) {

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
        await supabaseClient
            .auth
            .getSession();


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
            .from(
                "profiles"
            )
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


        await supabaseClient
            .auth
            .signOut();


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

        await supabaseClient
            .auth
            .signOut();


        window.location.href =
            "index.html";


        return null;

    }


    // ========================================================
    // ADMIN NAME
    // ========================================================

    const adminName =
        document.getElementById(
            "adminName"
        );


    if (
        adminName
    ) {

        adminName.textContent =
            profile.full_name ||
            "Administrator";

    }


    // ========================================================
    // ADMIN ROLE
    // ========================================================

    const adminRole =
        document.getElementById(
            "adminRole"
        );


    if (
        adminRole
    ) {

        adminRole.textContent =
            profile.role ===
            "superadmin"
                ? "Superadmin"
                : "Admin";

    }


    // ========================================================
    // ADMIN INITIAL
    // ========================================================

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
                .charAt(
                    0
                )
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
// RENDER USER PROFILE OPTIONS
// ============================================================

function renderUserProfiles() {

    if (
        !residentProfileSelect
    ) {

        return;

    }


    if (
        !availableResidentProfiles ||
        availableResidentProfiles.length ===
        0
    ) {

        residentProfileSelect.innerHTML = `

            <option value="">
                ${t(
            "adminNoActiveResidentUsers",
            {},
            "Ingen aktive beboerbrukere"
        )}
            </option>

        `;


        return;

    }


    residentProfileSelect.innerHTML = `

        <option value="">
            ${t(
            "adminSelectResidentProfile",
            {},
            "Velg brukerprofil"
        )}
        </option>

    ` +
        availableResidentProfiles
            .map(
                function (
                    profile
                ) {

                    return `

                        <option value="${profile.id}">
                            ${escapeHtml(
                        profile.full_name
                    )}
                            — ${escapeHtml(
                        profile.email
                    )}
                        </option>

                    `;

                }
            )
            .join(
                ""
            );

}


// ============================================================
// LOAD USER PROFILES
// ============================================================

async function loadUserProfiles() {

    if (
        !residentProfileSelect
    ) {

        return;

    }


    residentProfileSelect.innerHTML = `

        <option value="">
            ${t(
        "adminLoadingUserProfiles",
        {},
        "Laster brukerprofiler..."
    )}
        </option>

    `;


    const {
        data,
        error
    } =
        await supabaseClient
            .from(
                "profiles"
            )
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
                    ascending:
                        true
                }
            );


    if (
        error
    ) {

        console.error(
            "LOAD PROFILES ERROR:",
            error
        );


        availableResidentProfiles =
            [];


        residentProfileSelect.innerHTML = `

            <option value="">
                ${t(
            "adminCouldNotLoadUserProfiles",
            {},
            "Kunne ikke hente brukerprofiler"
        )}
            </option>

        `;


        return;

    }


    availableResidentProfiles =
        (data || [])
            .filter(
                function (
                    profile
                ) {

                    return (
                        profile.role ===
                        "resident"
                    );

                }
            );


    renderUserProfiles();

}

// ============================================================
// RENDER PROPERTY OPTIONS
// ============================================================

function renderProperties() {

    if (
        !residentPropertySelect
    ) {

        return;

    }


    if (
        !availableProperties ||
        availableProperties.length ===
        0
    ) {

        residentPropertySelect.innerHTML = `

            <option value="">
                ${t(
            "adminNoPropertiesAvailable",
            {},
            "Ingen boliger tilgjengelig"
        )}
            </option>

        `;


        return;

    }


    residentPropertySelect.innerHTML = `

        <option value="">
            ${t(
            "adminSelectProperty",
            {},
            "Velg bolig"
        )}
        </option>

    ` +
        availableProperties
            .map(
                function (
                    property
                ) {

                    return `

                        <option value="${property.id}">
                            ${escapeHtml(
                        property.name
                    )}
                            — ${escapeHtml(
                        property.address
                    )}
                        </option>

                    `;

                }
            )
            .join(
                ""
            );

}


// ============================================================
// LOAD PROPERTIES
// ============================================================

async function loadProperties() {

    if (
        !residentPropertySelect
    ) {

        return;

    }


    residentPropertySelect.innerHTML = `

        <option value="">
            ${t(
        "adminLoadingProperties",
        {},
        "Laster boliger..."
    )}
        </option>

    `;


    const {
        data,
        error
    } =
        await supabaseClient
            .from(
                "properties"
            )
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
                    ascending:
                        true
                }
            );


    if (
        error
    ) {

        console.error(
            "LOAD PROPERTIES ERROR:",
            error
        );


        availableProperties =
            [];


        residentPropertySelect.innerHTML = `

            <option value="">
                ${t(
            "adminCouldNotLoadProperties",
            {},
            "Kunne ikke hente boliger"
        )}
            </option>

        `;


        return;

    }


    availableProperties =
        data || [];


    renderProperties();

}


// ============================================================
// RENDER FLOOR OPTIONS
// ============================================================

function renderFloorOptions() {

    if (
        !residentFloorSelect
    ) {

        return;

    }


    if (
        !residentPropertySelect ||
        !residentPropertySelect.value
    ) {

        residentFloorSelect.innerHTML = `

            <option value="">
                ${t(
            "adminSelectPropertyFirst",
            {},
            "Velg bolig først"
        )}
            </option>

        `;


        residentFloorSelect.disabled =
            true;


        return;

    }


    if (
        !currentPropertyFloors ||
        currentPropertyFloors.length ===
        0
    ) {

        residentFloorSelect.innerHTML = `

            <option value="">
                ${t(
            "adminNoFloorsAvailable",
            {},
            "Ingen etasjer tilgjengelig"
        )}
            </option>

        `;


        residentFloorSelect.disabled =
            true;


        return;

    }


    residentFloorSelect.innerHTML = `

        <option value="">
            ${t(
            "adminSelectFloor",
            {},
            "Velg etasje"
        )}
        </option>

    ` +
        currentPropertyFloors
            .map(
                function (
                    floor
                ) {

                    const floorName =
                        floor.name ||
                        t(
                            "floorNumber",
                            {
                                floor:
                                floor.floor_number
                            },
                            floor.floor_number +
                            ". etasje"
                        );


                    return `

                        <option value="${floor.id}">
                            ${escapeHtml(
                        floorName
                    )}
                        </option>

                    `;

                }
            )
            .join(
                ""
            );


    residentFloorSelect.disabled =
        false;

}


// ============================================================
// LOAD FLOORS
// ============================================================

async function loadFloors(
    propertyId
) {

    if (
        !residentFloorSelect
    ) {

        return;

    }


    residentFloorSelect.disabled =
        true;


    currentPropertyFloors =
        [];


    if (
        !propertyId
    ) {

        renderFloorOptions();

        return;

    }


    residentFloorSelect.innerHTML = `

        <option value="">
            ${t(
        "adminLoadingFloors",
        {},
        "Laster etasjer..."
    )}
        </option>

    `;


    const {
        data,
        error
    } =
        await supabaseClient
            .from(
                "floors"
            )
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
                    ascending:
                        true
                }
            );


    if (
        error
    ) {

        console.error(
            "LOAD FLOORS ERROR:",
            error
        );


        residentFloorSelect.innerHTML = `

            <option value="">
                ${t(
            "adminCouldNotLoadFloors",
            {},
            "Kunne ikke hente etasjer"
        )}
            </option>

        `;


        return;

    }


    currentPropertyFloors =
        data || [];


    renderFloorOptions();

}


// ============================================================
// PROPERTY CHANGE
// ============================================================

if (
    residentPropertySelect
) {

    residentPropertySelect.addEventListener(
        "change",
        async function () {

            const propertyId =
                residentPropertySelect
                    .value;


            await loadFloors(
                propertyId
            );

        }
    );

}


// ============================================================
// RENDER RESIDENTS
// ============================================================

function renderResidents() {

    if (
        !residentList
    ) {

        return;

    }


    if (
        !currentResidents ||
        currentResidents.length ===
        0
    ) {

        residentList.innerHTML = `

            <p class="empty-state">
                ${t(
            "adminNoResidentsRegistered",
            {},
            "Ingen beboere er registrert ennå."
        )}
            </p>

        `;


        if (
            residentSearchEmpty
        ) {

            residentSearchEmpty.hidden =
                true;

        }


        return;

    }


    residentList.innerHTML =
        currentResidents
            .map(
                function (
                    resident
                ) {

                    const profile =
                        resident.profiles;

                    const property =
                        resident.properties;

                    const floor =
                        resident.floors;


                    const residentName =
                        profile
                            ? profile.full_name
                            : t(
                                "adminUnknownUser",
                                {},
                                "Ukjent bruker"
                            );


                    const residentEmail =
                        profile
                            ? profile.email
                            : "";


                    const propertyName =
                        property
                            ? property.name
                            : t(
                                "adminUnknownProperty",
                                {},
                                "Ukjent bolig"
                            );


                    const propertyAddress =
                        property
                            ? property.address
                            : "";


                    const floorName =
                        floor
                            ? (
                                floor.name ||
                                t(
                                    "floorNumber",
                                    {
                                        floor:
                                        floor.floor_number
                                    },
                                    floor.floor_number +
                                    ". etasje"
                                )
                            )
                            : t(
                                "adminNoFloor",
                                {},
                                "Ingen etasje"
                            );


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
                                getCurrentLocale()
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
                                    ${t(
                        "active",
                        {},
                        "Aktiv"
                    )}
                                </span>

                            </div>

                        </div>

                    `;

                }
            )
            .join(
                ""
            );


    filterResidentList();

}


// ============================================================
// LOAD RESIDENTS
// ============================================================

async function loadResidents() {

    if (
        !residentList
    ) {

        return;

    }


    residentList.innerHTML = `

        <p class="empty-state">
            ${t(
        "adminLoadingResidents",
        {},
        "Laster beboere..."
    )}
        </p>

    `;


    const {
        data,
        error
    } =
        await supabaseClient
            .from(
                "residents"
            )
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
                    ascending:
                        false
                }
            );


    if (
        error
    ) {

        console.error(
            "LOAD RESIDENTS ERROR:",
            error
        );


        currentResidents =
            [];


        activeResidentCount =
            0;


        if (
            residentCountBadge
        ) {

            residentCountBadge.textContent =
                "0";

        }


        updateResidentsToggleButton();


        updateResidentSearchCount(
            0
        );


        residentList.innerHTML = `

            <p class="message error">
                ${t(
            "adminCouldNotLoadResidents",
            {},
            "Kunne ikke hente beboere."
        )}
            </p>

        `;


        return;

    }


    currentResidents =
        data || [];


    activeResidentCount =
        currentResidents.length;


    if (
        residentCountBadge
    ) {

        residentCountBadge.textContent =
            String(
                activeResidentCount
            );

    }


    updateResidentsToggleButton();


    updateResidentSearchCount(
        activeResidentCount
    );


    renderResidents();

}

// ============================================================
// CREATE RESIDENT
// ============================================================

if (
    residentForm
) {

    residentForm.addEventListener(
        "submit",
        async function (
            event
        ) {

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


            // ========================================================
            // VALIDATION
            // ========================================================

            if (
                !profileId ||
                !propertyId ||
                !floorId
            ) {

                showResidentMessage(
                    t(
                        "adminSelectProfilePropertyFloor",
                        {},
                        "Velg brukerprofil, bolig og etasje."
                    ),
                    "error"
                );


                return;

            }


            // ========================================================
            // DISABLE SAVE BUTTON
            // ========================================================

            if (
                saveResidentButton
            ) {

                saveResidentButton.disabled =
                    true;


                saveResidentButton.textContent =
                    t(
                        "adminCreatingResident",
                        {},
                        "Oppretter..."
                    );

            }


            showResidentMessage(
                ""
            );


            // ========================================================
            // INSERT
            // ========================================================

            const {
                error
            } =
                await supabaseClient
                    .from(
                        "residents"
                    )
                    .insert(
                        {

                            profile_id:
                            profileId,

                            property_id:
                            propertyId,

                            floor_id:
                            floorId,

                            is_active:
                                true

                        }
                    );


            // ========================================================
            // ERROR
            // ========================================================

            if (
                error
            ) {

                console.error(
                    "CREATE RESIDENT ERROR:",
                    error
                );


                if (
                    error.code ===
                    "23505"
                ) {

                    showResidentMessage(
                        t(
                            "adminResidentAlreadyRegistered",
                            {},
                            "Denne brukeren er allerede registrert."
                        ),
                        "error"
                    );

                } else if (
                    error.code ===
                    "42501"
                ) {

                    showResidentMessage(
                        t(
                            "adminNoPermissionCreateResident",
                            {},
                            "Du har ikke tilgang til å opprette denne beboeren."
                        ),
                        "error"
                    );

                } else {

                    showResidentMessage(
                        t(
                            "adminCouldNotCreateResident",
                            {},
                            "Kunne ikke opprette beboer."
                        ),
                        "error"
                    );

                }


                if (
                    saveResidentButton
                ) {

                    saveResidentButton.disabled =
                        false;


                    saveResidentButton.textContent =
                        t(
                            "adminCreateResident",
                            {},
                            "Opprett beboer"
                        );

                }


                return;

            }


            // ========================================================
            // SUCCESS
            // ========================================================

            showResidentMessage(
                t(
                    "adminResidentCreated",
                    {},
                    "Beboeren ble opprettet."
                ),
                "success"
            );


            // ========================================================
            // RESET FORM
            // ========================================================

            residentForm.reset();


            currentPropertyFloors =
                [];


            if (
                residentFloorSelect
            ) {

                residentFloorSelect.innerHTML = `

                    <option value="">
                        ${t(
                    "adminSelectPropertyFirst",
                    {},
                    "Velg bolig først"
                )}
                    </option>

                `;


                residentFloorSelect.disabled =
                    true;

            }


            // ========================================================
            // RELOAD RESIDENTS
            // ========================================================

            await loadResidents();


            // ========================================================
            // REFRESH AVAILABLE RESIDENT PROFILES
            // ========================================================

            await loadUserProfiles();


            // ========================================================
            // ENABLE SAVE BUTTON
            // ========================================================

            if (
                saveResidentButton
            ) {

                saveResidentButton.disabled =
                    false;


                saveResidentButton.textContent =
                    t(
                        "adminCreateResident",
                        {},
                        "Opprett beboer"
                    );

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
        value ??
        "";


    return div.innerHTML;

}


// ============================================================
// REFRESH DYNAMIC TEXTS
// ============================================================

function refreshResidentPageLanguage() {

    // --------------------------------------------------------
    // TOGGLE BUTTON
    // --------------------------------------------------------

    updateResidentsToggleButton();


    // --------------------------------------------------------
    // SEARCH COUNT
    // --------------------------------------------------------

    if (
        residentSearchInput &&
        residentSearchInput.value.trim()
    ) {

        const visibleRows =
            Array.from(
                residentList
                    ? residentList.querySelectorAll(
                        ".admin-resident-row"
                    )
                    : []
            )
                .filter(
                    function (
                        row
                    ) {

                        return (
                            !row.hidden
                        );

                    }
                );


        updateResidentSearchCount(
            visibleRows.length
        );

    } else {

        updateResidentSearchCount(
            activeResidentCount
        );

    }


    // --------------------------------------------------------
    // USER PROFILE OPTIONS
    // --------------------------------------------------------

    if (
        availableResidentProfiles.length >
        0
    ) {

        const selectedProfileId =
            residentProfileSelect
                ? residentProfileSelect.value
                : "";


        renderUserProfiles();


        if (
            residentProfileSelect &&
            selectedProfileId
        ) {

            residentProfileSelect.value =
                selectedProfileId;

        }

    }


    // --------------------------------------------------------
    // PROPERTY OPTIONS
    // --------------------------------------------------------

    if (
        availableProperties.length >
        0
    ) {

        const selectedPropertyId =
            residentPropertySelect
                ? residentPropertySelect.value
                : "";


        renderProperties();


        if (
            residentPropertySelect &&
            selectedPropertyId
        ) {

            residentPropertySelect.value =
                selectedPropertyId;

        }

    }


    // --------------------------------------------------------
    // FLOOR OPTIONS
    // --------------------------------------------------------

    if (
        residentPropertySelect &&
        residentPropertySelect.value
    ) {

        const selectedFloorId =
            residentFloorSelect
                ? residentFloorSelect.value
                : "";


        renderFloorOptions();


        if (
            residentFloorSelect &&
            selectedFloorId
        ) {

            residentFloorSelect.value =
                selectedFloorId;

        }

    } else {

        renderFloorOptions();

    }


    // --------------------------------------------------------
    // RESIDENT LIST
    // --------------------------------------------------------

    renderResidents();


    // --------------------------------------------------------
    // SAVE BUTTON
    // --------------------------------------------------------

    if (
        saveResidentButton &&
        !saveResidentButton.disabled
    ) {

        saveResidentButton.textContent =
            t(
                "adminCreateResident",
                {},
                "Opprett beboer"
            );

    }


    // --------------------------------------------------------
    // REFILTER
    // --------------------------------------------------------

    filterResidentList();

}


// ============================================================
// LANGUAGE CHANGE
// ============================================================

window.addEventListener(
    "cleanplan:languagechange",
    function () {

        refreshResidentPageLanguage();

    }
);


// ============================================================
// START
// ============================================================

async function initResidentsPage() {

    const result =
        await checkAdmin();


    if (
        !result
    ) {

        return;

    }


    // ========================================================
    // KEEP REGISTERED RESIDENTS COLLAPSED
    // ========================================================

    setResidentListOpen(
        false
    );


    // ========================================================
    // LOAD PAGE DATA
    // ========================================================

    await Promise.all(
        [

            loadUserProfiles(),

            loadProperties(),

            loadResidents()

        ]
    );


    // ========================================================
    // FINAL UI UPDATE
    // ========================================================

    updateResidentsToggleButton();


    filterResidentList();

}


// ============================================================
// INITIALIZE PAGE
// ============================================================

initResidentsPage();


