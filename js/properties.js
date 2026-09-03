// ============================================================
// CLEANPLAN
// PROPERTIES
// ============================================================


// ============================================================
// ELEMENTS
// ============================================================

const propertyForm =
    document.getElementById(
        "propertyForm"
    );

const propertyNameInput =
    document.getElementById(
        "propertyName"
    );

const propertyAddressInput =
    document.getElementById(
        "propertyAddress"
    );

const floorCountInput =
    document.getElementById(
        "floorCount"
    );

const savePropertyButton =
    document.getElementById(
        "savePropertyButton"
    );

const propertyMessage =
    document.getElementById(
        "propertyMessage"
    );

const propertyList =
    document.getElementById(
        "propertyList"
    );

const registeredPropertiesContent =
    document.getElementById(
        "registeredPropertiesContent"
    );

const togglePropertyListButton =
    document.getElementById(
        "togglePropertyListButton"
    );

const togglePropertyListText =
    document.getElementById(
        "togglePropertyListText"
    );

const togglePropertyListChevron =
    document.getElementById(
        "togglePropertyListChevron"
    );

const propertyCountBadge =
    document.getElementById(
        "propertyCountBadge"
    );

const propertySearchInput =
    document.getElementById(
        "propertySearchInput"
    );

const clearPropertySearchButton =
    document.getElementById(
        "clearPropertySearchButton"
    );

const propertySearchResultText =
    document.getElementById(
        "propertySearchResultText"
    );

const propertySearchEmpty =
    document.getElementById(
        "propertySearchEmpty"
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
// HEADER PROFILE
// ============================================================

const adminName =
    document.getElementById(
        "adminName"
    );

const adminRole =
    document.getElementById(
        "adminRole"
    );

const adminInitial =
    document.getElementById(
        "adminInitial"
    );


// ============================================================
// STATE
// ============================================================

let activePropertyCount =
    0;

let currentProfile =
    null;

let currentSession =
    null;

let currentProperties =
    [];


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

function showPropertyMessage(
    message,
    type = ""
) {

    if (
        !propertyMessage
    ) {

        return;

    }


    propertyMessage.textContent =
        message;


    propertyMessage.className =
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
// UPDATE PROPERTY TOGGLE BUTTON
// ============================================================

function updatePropertyToggleButton() {

    if (
        !togglePropertyListButton
    ) {

        return;

    }


    const isOpen =
        registeredPropertiesContent
            ? !registeredPropertiesContent.hidden
            : false;


    togglePropertyListButton.setAttribute(
        "aria-expanded",
        String(
            isOpen
        )
    );


    if (
        togglePropertyListText
    ) {

        togglePropertyListText.textContent =
            (
                isOpen
                    ? t(
                        "adminHideProperties",
                        {},
                        "Skjul boliger"
                    )
                    : t(
                        "adminShowProperties",
                        {},
                        "Vis boliger"
                    )
            ) +
            " (" +
            activePropertyCount +
            ")";

    }


    if (
        togglePropertyListChevron
    ) {

        togglePropertyListChevron.textContent =
            isOpen
                ? "⌃"
                : "⌄";

    }

}


// ============================================================
// SET PROPERTY LIST VISIBILITY
// ============================================================

function setPropertyListOpen(
    shouldOpen
) {

    if (
        !registeredPropertiesContent
    ) {

        return;

    }


    registeredPropertiesContent.hidden =
        !shouldOpen;


    updatePropertyToggleButton();


    if (
        shouldOpen &&
        propertySearchInput
    ) {

        window.setTimeout(
            function () {

                propertySearchInput.focus();

            },
            0
        );

    }

}


// ============================================================
// PROPERTY SEARCH RESULT TEXT
// ============================================================

function updatePropertySearchResultText(
    visibleCount
) {

    if (
        !propertySearchResultText
    ) {

        return;

    }


    propertySearchResultText.textContent =
        visibleCount ===
        1
            ? t(
                "adminPropertySingularFound",
                {
                    count:
                    visibleCount
                },
                visibleCount +
                " bolig funnet"
            )
            : t(
                "adminPropertyPluralFound",
                {
                    count:
                    visibleCount
                },
                visibleCount +
                " boliger funnet"
            );

}


// ============================================================
// FILTER PROPERTY LIST
// ============================================================

function filterPropertyList() {

    if (
        !propertyList
    ) {

        return;

    }


    const query =
        propertySearchInput
            ? propertySearchInput
                .value
                .trim()
                .toLocaleLowerCase(
                    getCurrentLocale()
                )
            : "";


    const rows =
        Array.from(
            propertyList.querySelectorAll(
                ".property-row"
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
                    row.dataset.searchText ||
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
        clearPropertySearchButton
    ) {

        clearPropertySearchButton.hidden =
            query.length ===
            0;

    }


    if (
        propertySearchEmpty
    ) {

        propertySearchEmpty.hidden =
            !(
                query &&
                rows.length >
                0 &&
                visibleCount ===
                0
            );

    }


    updatePropertySearchResultText(
        query
            ? visibleCount
            : activePropertyCount
    );

}


// ============================================================
// TOGGLE REGISTERED PROPERTIES
// ============================================================

if (
    togglePropertyListButton
) {

    togglePropertyListButton.addEventListener(
        "click",
        function () {

            const isOpen =
                registeredPropertiesContent
                    ? !registeredPropertiesContent.hidden
                    : false;


            setPropertyListOpen(
                !isOpen
            );

        }
    );

}


// ============================================================
// SEARCH REGISTERED PROPERTIES
// ============================================================

if (
    propertySearchInput
) {

    propertySearchInput.addEventListener(
        "input",
        filterPropertyList
    );

}


// ============================================================
// CLEAR PROPERTY SEARCH
// ============================================================

if (
    clearPropertySearchButton
) {

    clearPropertySearchButton.addEventListener(
        "click",
        function () {

            if (
                !propertySearchInput
            ) {

                return;

            }


            propertySearchInput.value =
                "";


            filterPropertyList();


            propertySearchInput.focus();

        }
    );

}


// ============================================================
// UPDATE ADMIN PROFILE UI
// ============================================================

function updateAdminProfileUi(
    profile,
    session
) {

    if (
        !profile
    ) {

        return;

    }


    // ========================================================
    // DISPLAY NAME
    // ========================================================

    const profileName =
        typeof profile.full_name ===
        "string"
            ? profile.full_name.trim()
            : "";


    const metadataName =
        typeof session?.user
            ?.user_metadata
            ?.full_name ===
        "string"
            ? session.user
                .user_metadata
                .full_name
                .trim()
            : "";


    const emailName =
        session?.user?.email
            ? session.user.email
                .split("@")[0]
                .trim()
            : "";


    const displayName =
        profileName ||
        metadataName ||
        emailName ||
        "Administrator";


    // ========================================================
    // NAME
    // ========================================================

    if (
        adminName
    ) {

        adminName.textContent =
            displayName;

    }


    // ========================================================
    // ROLE
    // ========================================================

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
    // INITIAL
    // ========================================================

    if (
        adminInitial
    ) {

        adminInitial.textContent =
            displayName
                .charAt(0)
                .toUpperCase();

    }

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


    // ========================================================
    // SESSION
    // ========================================================

    if (
        sessionError ||
        !session
    ) {

        window.location.href =
            "index.html";


        return null;

    }


    // ========================================================
    // PROFILE
    // ========================================================

    const {
        data: profile,
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
                "id",
                session.user.id
            )
            .single();


    // ========================================================
    // PROFILE ERROR
    // ========================================================

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


    // ========================================================
    // ACCESS CONTROL
    // ========================================================

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
    // CACHE CURRENT USER
    // ========================================================

    currentProfile =
        profile;


    currentSession =
        session;


    // ========================================================
    // HEADER PROFILE
    // ========================================================

    updateAdminProfileUi(
        profile,
        session
    );


    return {
        session:
        session,

        profile:
        profile
    };

}


// ============================================================
// CREATE DEACTIVATED PROPERTIES SECTION
// ============================================================

function createDeactivatedSection() {

    let section =
        document.getElementById(
            "deactivatedPropertiesSection"
        );


    if (
        section
    ) {

        return section;

    }


    section =
        document.createElement(
            "section"
        );


    section.id =
        "deactivatedPropertiesSection";


    section.className =
        "properties-section";


    section.innerHTML = `

        <h2>
            ${t(
        "adminDeactivatedProperties",
        {},
        "Deaktiverte boliger"
    )}
        </h2>

        <p class="section-description">
            ${t(
        "adminDeactivatedPropertiesDescription",
        {},
        "Deaktiverte boliger kan gjenopprettes i opptil 2 måneder."
    )}
        </p>

        <div id="deactivatedPropertyList">
        </div>

    `;


    const parent =
        document.querySelector(
            ".admin-properties-layout"
        ) ||
        propertyList?.parentElement;


    if (
        parent
    ) {

        parent.appendChild(
            section
        );

    }


    return section;

}


// ============================================================
// FORMAT DATE
// ============================================================

function formatLocalizedDate(
    value
) {

    if (
        !value
    ) {

        return "";

    }


    const date =
        new Date(
            value
        );


    if (
        Number.isNaN(
            date.getTime()
        )
    ) {

        return "";

    }


    return date.toLocaleDateString(
        getCurrentLocale(),
        {
            day:
                "2-digit",

            month:
                "2-digit",

            year:
                "numeric"
        }
    );

}


// ============================================================
// FORMAT DATE + TIME
// ============================================================

function formatLocalizedDateTime(
    value
) {

    if (
        !value
    ) {

        return "";

    }


    const date =
        new Date(
            value
        );


    if (
        Number.isNaN(
            date.getTime()
        )
    ) {

        return "";

    }


    return date.toLocaleString(
        getCurrentLocale(),
        {
            day:
                "2-digit",

            month:
                "2-digit",

            year:
                "numeric",

            hour:
                "2-digit",

            minute:
                "2-digit",

            second:
                "2-digit"
        }
    );

}


// ============================================================
// AUDIT ACTION LABEL
// ============================================================

function getAuditActionLabel(
    action
) {

    switch (
        action
        ) {

        case "created":

            return (
                "🟢 " +
                t(
                    "adminAuditCreatedBy",
                    {},
                    "Opprettet av"
                )
            );


        case "updated":

            return (
                "✏️ " +
                t(
                    "adminAuditUpdatedBy",
                    {},
                    "Endret av"
                )
            );


        case "deactivated":

            return (
                "🔴 " +
                t(
                    "adminAuditDeactivatedBy",
                    {},
                    "Deaktivert av"
                )
            );


        case "restored":

            return (
                "↩️ " +
                t(
                    "adminAuditRestoredBy",
                    {},
                    "Gjenopprettet av"
                )
            );


        case "deleted":

        case "permanently_deleted":

            return (
                "🗑️ " +
                t(
                    "adminAuditPermanentlyDeletedBy",
                    {},
                    "Permanent slettet av"
                )
            );


        default:

            return (
                "ℹ️ " +
                (
                    action ||
                    ""
                )
            );

    }

}

// ============================================================
// LOAD PROPERTY HISTORY
// ============================================================

async function loadPropertyHistory(
    propertyId
) {

    if (
        !propertyId
    ) {

        return [];

    }


    const {
        data,
        error
    } =
        await supabaseClient
            .rpc(
                "get_property_audit_history",
                {
                    target_property_id:
                    propertyId
                }
            );


    if (
        error
    ) {

        console.error(
            "LOAD PROPERTY HISTORY ERROR:",
            error
        );


        return null;

    }


    return (
        data ||
        []
    );

}


// ============================================================
// CREATE HISTORY HTML
// ============================================================

function createHistoryHtml(
    history
) {

    if (
        history ===
        null
    ) {

        return `

            <div class="property-history-error">

                <p class="message error">
                    ${t(
            "adminCouldNotLoadHistory",
            {},
            "Kunne ikke hente historikken."
        )}
                </p>

            </div>

        `;

    }


    if (
        !history ||
        history.length ===
        0
    ) {

        return `

            <div class="property-history">

                <p class="empty-state">
                    ${t(
            "adminNoActivityRegistered",
            {},
            "Ingen aktivitet registrert."
        )}
                </p>

            </div>

        `;

    }


    return `

        <div class="property-history">

            <h4>
                📋
                ${t(
        "adminActivityHistory",
        {},
        "Aktivitet / historikk"
    )}
            </h4>

            <div class="property-history-list">

                ${history
        .map(
            function (
                entry
            ) {

                return `

                                <div class="property-history-item">

                                    <div class="property-history-action">
                                        ${getAuditActionLabel(
                    entry.action
                )}
                                    </div>

                                    <div class="property-history-user">
                                        ${escapeHtml(
                    entry.performed_by_name ||
                    t(
                        "adminUnknownUser",
                        {},
                        "Ukjent bruker"
                    )
                )}
                                    </div>

                                    <div class="property-history-time">
                                        ${formatLocalizedDateTime(
                    entry.performed_at
                )}
                                    </div>

                                </div>

                            `;

            }
        )
        .join(
            ""
        )}

            </div>

        </div>

    `;

}


// ============================================================
// TOGGLE PROPERTY HISTORY
// ============================================================

async function togglePropertyHistory(
    button
) {

    const propertyId =
        button.dataset
            .propertyId;


    const historyContainer =
        document.getElementById(
            "property-history-" +
            propertyId
        );


    if (
        !propertyId ||
        !historyContainer
    ) {

        return;

    }


    const isOpen =
        historyContainer.style.display !==
        "none";


    // ========================================================
    // CLOSE
    // ========================================================

    if (
        isOpen
    ) {

        historyContainer.style.display =
            "none";


        button.textContent =
            "📋 " +
            t(
                "adminHistory",
                {},
                "Historikk"
            );


        return;

    }


    // ========================================================
    // OPEN
    // ========================================================

    button.disabled =
        true;


    button.textContent =
        t(
            "loading",
            {},
            "Laster..."
        );


    const history =
        await loadPropertyHistory(
            propertyId
        );


    historyContainer.innerHTML =
        createHistoryHtml(
            history
        );


    historyContainer.style.display =
        "";


    button.disabled =
        false;


    button.textContent =
        "📋 " +
        t(
            "adminHideHistory",
            {},
            "Skjul historikk"
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
// RENDER ACTIVE PROPERTIES
// ============================================================

function renderActiveProperties(
    activeProperties
) {

    if (
        !propertyList
    ) {

        return;

    }


    // ========================================================
    // EMPTY
    // ========================================================

    if (
        !activeProperties ||
        activeProperties.length ===
        0
    ) {

        propertyList.innerHTML = `

            <p class="empty-state">
                ${t(
            "adminNoActiveProperties",
            {},
            "Ingen aktive boliger er opprettet ennå."
        )}
            </p>

        `;


        if (
            propertySearchEmpty
        ) {

            propertySearchEmpty.hidden =
                true;

        }


        updatePropertySearchResultText(
            0
        );


        return;

    }


    // ========================================================
    // RENDER
    // ========================================================

    propertyList.innerHTML =
        activeProperties
            .map(
                function (
                    property
                ) {

                    const searchText =
                        (
                            (
                                property.name ||
                                ""
                            ) +
                            " " +
                            (
                                property.address ||
                                ""
                            )
                        )
                            .trim()
                            .toLocaleLowerCase(
                                getCurrentLocale()
                            );


                    const floorText =
                        t(
                            property.floor_count ===
                            1
                                ? "adminOneFloor"
                                : "adminMultipleFloors",
                            {
                                count:
                                property.floor_count
                            },
                            property.floor_count +
                            " etasje(r)"
                        );


                    return `

                        <div
                                class="property-row"
                                data-search-text="${escapeHtml(
                        searchText
                    )}"
                        >

                            <div class="property-content">

                                <h3>
                                    🏠
                                    ${escapeHtml(
                        property.name
                    )}
                                </h3>

                                <p>
                                    ${escapeHtml(
                        property.address
                    )}
                                </p>

                                <div class="property-meta">

                                    <span>
                                        ${floorText}
                                    </span>

                                </div>

                            </div>


                            <div class="property-actions">

                                <button
                                        type="button"
                                        class="secondary-button property-open-button"
                                        data-property-id="${property.id}"
                                >
                                    ${t(
                        "adminOpen",
                        {},
                        "Åpne"
                    )}
                                    →
                                </button>

                                <button
                                        type="button"
                                        class="secondary-button property-history-button"
                                        data-property-id="${property.id}"
                                >
                                    📋
                                    ${t(
                        "adminHistory",
                        {},
                        "Historikk"
                    )}
                                </button>

                                <button
                                        type="button"
                                        class="secondary-button property-deactivate-button"
                                        data-property-id="${property.id}"
                                        data-property-name="${escapeHtml(
                        property.name
                    )}"
                                >
                                    ${t(
                        "adminDeactivateProperty",
                        {},
                        "Deaktiver bolig"
                    )}
                                </button>

                            </div>


                            <div
                                    id="property-history-${property.id}"
                                    class="property-history-container"
                                    style="display: none;"
                            ></div>

                        </div>

                    `;

                }
            )
            .join(
                ""
            );


    // ========================================================
    // FILTER CURRENT SEARCH
    // ========================================================

    filterPropertyList();


    // ========================================================
    // OPEN PROPERTY BUTTONS
    // ========================================================

    const openButtons =
        propertyList.querySelectorAll(
            ".property-open-button"
        );


    openButtons.forEach(
        function (
            button
        ) {

            button.addEventListener(
                "click",
                function () {

                    const propertyId =
                        button.dataset
                            .propertyId;


                    if (
                        !propertyId
                    ) {

                        console.error(
                            "PROPERTY ID MANGLER"
                        );


                        return;

                    }


                    window.location.href =
                        "floors.html?property_id=" +
                        encodeURIComponent(
                            propertyId
                        );

                }
            );

        }
    );


    // ========================================================
    // HISTORY BUTTONS
    // ========================================================

    const historyButtons =
        propertyList.querySelectorAll(
            ".property-history-button"
        );


    historyButtons.forEach(
        function (
            button
        ) {

            button.addEventListener(
                "click",
                async function () {

                    await togglePropertyHistory(
                        button
                    );

                }
            );

        }
    );


    // ========================================================
    // DEACTIVATE BUTTONS
    // ========================================================

    const deactivateButtons =
        propertyList.querySelectorAll(
            ".property-deactivate-button"
        );


    deactivateButtons.forEach(
        function (
            button
        ) {

            button.addEventListener(
                "click",
                async function () {

                    const propertyId =
                        button.dataset
                            .propertyId;


                    const propertyName =
                        button.dataset
                            .propertyName;


                    if (
                        !propertyId
                    ) {

                        return;

                    }


                    const confirmed =
                        window.confirm(
                            t(
                                "adminConfirmDeactivateProperty",
                                {
                                    name:
                                    propertyName
                                },
                                "Vil du deaktivere boligen \"" +
                                propertyName +
                                "\"?\n\n" +
                                "Boligen blir ikke slettet med en gang. " +
                                "Den kan gjenopprettes i 2 måneder " +
                                "før permanent sletting."
                            )
                        );


                    if (
                        !confirmed
                    ) {

                        return;

                    }


                    button.disabled =
                        true;


                    button.textContent =
                        t(
                            "adminDeactivating",
                            {},
                            "Deaktiverer..."
                        );


                    const {
                        data: result,
                        error
                    } =
                        await supabaseClient
                            .rpc(
                                "deactivate_property",
                                {
                                    target_property_id:
                                    propertyId
                                }
                            );


                    // ================================================
                    // RPC ERROR
                    // ================================================

                    if (
                        error
                    ) {

                        console.error(
                            "DEACTIVATE PROPERTY ERROR:",
                            error
                        );


                        showPropertyMessage(
                            t(
                                "adminCouldNotDeactivateProperty",
                                {},
                                "Kunne ikke deaktivere boligen."
                            ),
                            "error"
                        );


                        button.disabled =
                            false;


                        button.textContent =
                            t(
                                "adminDeactivateProperty",
                                {},
                                "Deaktiver bolig"
                            );


                        return;

                    }


                    // ================================================
                    // RPC RETURNED FALSE
                    // ================================================

                    if (
                        !result
                    ) {

                        showPropertyMessage(
                            t(
                                "adminPropertyCouldNotBeDeactivated",
                                {},
                                "Boligen kunne ikke deaktiveres."
                            ),
                            "error"
                        );


                        button.disabled =
                            false;


                        button.textContent =
                            t(
                                "adminDeactivateProperty",
                                {},
                                "Deaktiver bolig"
                            );


                        return;

                    }


                    // ================================================
                    // SUCCESS
                    // ================================================

                    showPropertyMessage(
                        t(
                            "adminPropertyDeactivated",
                            {},
                            "Boligen ble deaktivert."
                        ),
                        "success"
                    );


                    await loadProperties();

                }
            );

        }
    );

}


// ============================================================
// RENDER DEACTIVATED PROPERTIES
// ============================================================

function renderDeactivatedProperties(
    properties
) {

    const section =
        createDeactivatedSection();


    const list =
        document.getElementById(
            "deactivatedPropertyList"
        );


    if (
        !section ||
        !list
    ) {

        return;

    }


    // ========================================================
    // NONE
    // ========================================================

    if (
        !properties ||
        properties.length ===
        0
    ) {

        section.style.display =
            "none";


        list.innerHTML =
            "";


        return;

    }


    section.style.display =
        "";


    // ========================================================
    // UPDATE TRANSLATED SECTION HEADING
    // ========================================================

    const sectionHeading =
        section.querySelector(
            "h2"
        );


    const sectionDescription =
        section.querySelector(
            ".section-description"
        );


    if (
        sectionHeading
    ) {

        sectionHeading.textContent =
            t(
                "adminDeactivatedProperties",
                {},
                "Deaktiverte boliger"
            );

    }


    if (
        sectionDescription
    ) {

        sectionDescription.textContent =
            t(
                "adminDeactivatedPropertiesDescription",
                {},
                "Deaktiverte boliger kan gjenopprettes i opptil 2 måneder."
            );

    }


    // ========================================================
    // LIST
    // ========================================================

    list.innerHTML =
        properties
            .map(
                function (
                    property
                ) {

                    const deletionDate =
                        formatLocalizedDate(
                            property.scheduled_deletion_at
                        );


                    const floorText =
                        t(
                            property.floor_count ===
                            1
                                ? "adminOneFloor"
                                : "adminMultipleFloors",
                            {
                                count:
                                property.floor_count
                            },
                            property.floor_count +
                            " etasje(r)"
                        );


                    return `

                        <div class="property-row">

                            <div class="property-content">

                                <h3>
                                    🏠
                                    ${escapeHtml(
                        property.name
                    )}
                                </h3>

                                <p>
                                    ${escapeHtml(
                        property.address
                    )}
                                </p>

                                <div class="property-meta">

                                    <span>
                                        ${floorText}
                                    </span>

                                    <span>
                                        ${t(
                        "adminDeactivated",
                        {},
                        "Deaktivert"
                    )}:
                                        ${formatLocalizedDate(
                        property.deactivated_at
                    )}
                                    </span>

                                    <span>
                                        ${t(
                        "adminPermanentDeletion",
                        {},
                        "Permanent sletting"
                    )}:
                                        ${deletionDate}
                                    </span>

                                </div>

                            </div>


                            <div class="property-actions">

                                <button
                                        type="button"
                                        class="secondary-button property-history-button"
                                        data-property-id="${property.id}"
                                >
                                    📋
                                    ${t(
                        "adminHistory",
                        {},
                        "Historikk"
                    )}
                                </button>

                                <button
                                        type="button"
                                        class="primary-button property-restore-button"
                                        data-property-id="${property.id}"
                                >
                                    ↩
                                    ${t(
                        "adminRestoreProperty",
                        {},
                        "Gjenopprett bolig"
                    )}
                                </button>

                            </div>


                            <div
                                    id="property-history-${property.id}"
                                    class="property-history-container"
                                    style="display: none;"
                            ></div>

                        </div>

                    `;

                }
            )
            .join(
                ""
            );


    // ========================================================
    // HISTORY BUTTONS
    // ========================================================

    const historyButtons =
        list.querySelectorAll(
            ".property-history-button"
        );


    historyButtons.forEach(
        function (
            button
        ) {

            button.addEventListener(
                "click",
                async function () {

                    await togglePropertyHistory(
                        button
                    );

                }
            );

        }
    );


    // ========================================================
    // RESTORE BUTTONS
    // ========================================================

    const restoreButtons =
        list.querySelectorAll(
            ".property-restore-button"
        );


    restoreButtons.forEach(
        function (
            button
        ) {

            button.addEventListener(
                "click",
                async function () {

                    const propertyId =
                        button.dataset
                            .propertyId;


                    if (
                        !propertyId
                    ) {

                        return;

                    }


                    const confirmed =
                        window.confirm(
                            t(
                                "adminConfirmRestoreProperty",
                                {},
                                "Vil du gjenopprette denne boligen?"
                            )
                        );


                    if (
                        !confirmed
                    ) {

                        return;

                    }


                    button.disabled =
                        true;


                    button.textContent =
                        t(
                            "adminRestoring",
                            {},
                            "Gjenoppretter..."
                        );


                    const {
                        data: result,
                        error
                    } =
                        await supabaseClient
                            .rpc(
                                "restore_property",
                                {
                                    target_property_id:
                                    propertyId
                                }
                            );


                    // ================================================
                    // RPC ERROR
                    // ================================================

                    if (
                        error
                    ) {

                        console.error(
                            "RESTORE PROPERTY ERROR:",
                            error
                        );


                        showPropertyMessage(
                            t(
                                "adminCouldNotRestoreProperty",
                                {},
                                "Kunne ikke gjenopprette boligen."
                            ),
                            "error"
                        );


                        button.disabled =
                            false;


                        button.textContent =
                            "↩ " +
                            t(
                                "adminRestoreProperty",
                                {},
                                "Gjenopprett bolig"
                            );


                        return;

                    }


                    // ================================================
                    // RPC FALSE
                    // ================================================

                    if (
                        !result
                    ) {

                        showPropertyMessage(
                            t(
                                "adminPropertyCouldNotBeRestored",
                                {},
                                "Boligen kunne ikke gjenopprettes. 2-månedersfristen kan være utløpt."
                            ),
                            "error"
                        );


                        button.disabled =
                            false;


                        button.textContent =
                            "↩ " +
                            t(
                                "adminRestoreProperty",
                                {},
                                "Gjenopprett bolig"
                            );


                        return;

                    }


                    // ================================================
                    // SUCCESS
                    // ================================================

                    showPropertyMessage(
                        t(
                            "adminPropertyRestored",
                            {},
                            "Boligen ble gjenopprettet."
                        ),
                        "success"
                    );


                    await loadProperties();

                }
            );

        }
    );

}


// ============================================================
// LOAD PROPERTIES
// ============================================================

async function loadProperties() {

    if (
        !propertyList
    ) {

        return;

    }


    // ========================================================
    // LOADING
    // ========================================================

    propertyList.innerHTML = `

        <p class="empty-state">
            ${t(
        "adminLoadingProperties",
        {},
        "Laster boliger..."
    )}
        </p>

    `;


    // ========================================================
    // DATABASE
    // ========================================================

    const {
        data,
        error
    } =
        await supabaseClient
            .from(
                "properties"
            )
            .select(
                "id, name, address, floor_count, is_active, created_at, deactivated_at, scheduled_deletion_at"
            )
            .order(
                "created_at",
                {
                    ascending:
                        false
                }
            );


    // ========================================================
    // ERROR
    // ========================================================

    if (
        error
    ) {

        console.error(
            "LOAD PROPERTIES ERROR:",
            error
        );


        currentProperties =
            [];


        activePropertyCount =
            0;


        propertyList.innerHTML = `

            <p class="message error">
                ${t(
            "adminCouldNotLoadProperties",
            {},
            "Kunne ikke hente boliger."
        )}
            </p>

        `;


        if (
            propertyCountBadge
        ) {

            propertyCountBadge.textContent =
                "0";

        }


        updatePropertyToggleButton();


        updatePropertySearchResultText(
            0
        );


        return;

    }


    // ========================================================
    // CACHE
    // ========================================================

    currentProperties =
        data ||
        [];


    // ========================================================
    // SPLIT ACTIVE / DEACTIVATED
    // ========================================================

    const activeProperties =
        currentProperties.filter(
            function (
                property
            ) {

                return (
                    property.is_active ===
                    true
                );

            }
        );


    const deactivatedProperties =
        currentProperties.filter(
            function (
                property
            ) {

                return (
                    property.is_active ===
                    false
                );

            }
        );


    // ========================================================
    // COUNT
    // ========================================================

    activePropertyCount =
        activeProperties.length;


    if (
        propertyCountBadge
    ) {

        propertyCountBadge.textContent =
            String(
                activePropertyCount
            );

    }


    updatePropertyToggleButton();


    // ========================================================
    // RENDER
    // ========================================================

    renderActiveProperties(
        activeProperties
    );


    renderDeactivatedProperties(
        deactivatedProperties
    );

}

// ============================================================
// CREATE PROPERTY
// ============================================================

if (
    propertyForm
) {

    propertyForm.addEventListener(
        "submit",
        async function (
            event
        ) {

            event.preventDefault();


            const name =
                propertyNameInput
                    ? propertyNameInput
                        .value
                        .trim()
                    : "";


            const address =
                propertyAddressInput
                    ? propertyAddressInput
                        .value
                        .trim()
                    : "";


            const floorCount =
                floorCountInput
                    ? Number(
                        floorCountInput.value
                    )
                    : 0;


            // ========================================================
            // VALIDATION
            // ========================================================

            if (
                !name ||
                !address ||
                !floorCount ||
                floorCount <
                1
            ) {

                showPropertyMessage(
                    t(
                        "adminFillAllFields",
                        {},
                        "Fyll inn alle feltene."
                    ),
                    "error"
                );


                return;

            }


            // ========================================================
            // DISABLE BUTTON
            // ========================================================

            if (
                savePropertyButton
            ) {

                savePropertyButton.disabled =
                    true;


                savePropertyButton.textContent =
                    t(
                        "adminSaving",
                        {},
                        "Lagrer..."
                    );

            }


            showPropertyMessage(
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
                        "properties"
                    )
                    .insert(
                        {
                            name:
                            name,

                            address:
                            address,

                            floor_count:
                            floorCount,

                            is_active:
                                true
                        }
                    );


            // ========================================================
            // INSERT ERROR
            // ========================================================

            if (
                error
            ) {

                console.error(
                    "CREATE PROPERTY ERROR:",
                    error
                );


                if (
                    error.code ===
                    "23505"
                ) {

                    showPropertyMessage(
                        t(
                            "adminAddressAlreadyRegistered",
                            {},
                            "Denne adressen er allerede registrert."
                        ),
                        "error"
                    );

                } else {

                    showPropertyMessage(
                        t(
                            "adminCouldNotSaveProperty",
                            {},
                            "Kunne ikke lagre boligen."
                        ),
                        "error"
                    );

                }


                if (
                    savePropertyButton
                ) {

                    savePropertyButton.disabled =
                        false;


                    savePropertyButton.textContent =
                        t(
                            "adminSaveProperty",
                            {},
                            "Lagre bolig"
                        );

                }


                return;

            }


            // ========================================================
            // SUCCESS
            // ========================================================

            showPropertyMessage(
                t(
                    "adminPropertySaved",
                    {},
                    "Boligen ble lagret."
                ),
                "success"
            );


            propertyForm.reset();


            if (
                floorCountInput
            ) {

                floorCountInput.value =
                    "1";

            }


            // ========================================================
            // RELOAD
            // ========================================================

            await loadProperties();


            // ========================================================
            // ENABLE BUTTON
            // ========================================================

            if (
                savePropertyButton
            ) {

                savePropertyButton.disabled =
                    false;


                savePropertyButton.textContent =
                    t(
                        "adminSaveProperty",
                        {},
                        "Lagre bolig"
                    );

            }

        }
    );

}


// ============================================================
// REFRESH DYNAMIC LANGUAGE
// ============================================================

function refreshPropertiesLanguage() {

    // ========================================================
    // PROFILE
    // ========================================================

    if (
        currentProfile &&
        currentSession
    ) {

        updateAdminProfileUi(
            currentProfile,
            currentSession
        );

    }


    // ========================================================
    // BUTTONS / COUNTS
    // ========================================================

    updatePropertyToggleButton();


    // ========================================================
    // RERENDER FROM CACHE
    // NO SUPABASE CALL
    // ========================================================

    const activeProperties =
        currentProperties.filter(
            function (
                property
            ) {

                return (
                    property.is_active ===
                    true
                );

            }
        );


    const deactivatedProperties =
        currentProperties.filter(
            function (
                property
            ) {

                return (
                    property.is_active ===
                    false
                );

            }
        );


    activePropertyCount =
        activeProperties.length;


    if (
        propertyCountBadge
    ) {

        propertyCountBadge.textContent =
            String(
                activePropertyCount
            );

    }


    renderActiveProperties(
        activeProperties
    );


    renderDeactivatedProperties(
        deactivatedProperties
    );


    // ========================================================
    // SEARCH RESULT
    // ========================================================

    filterPropertyList();


    // ========================================================
    // SAVE BUTTON
    // ========================================================

    if (
        savePropertyButton &&
        !savePropertyButton.disabled
    ) {

        savePropertyButton.textContent =
            t(
                "adminSaveProperty",
                {},
                "Lagre bolig"
            );

    }

}


// ============================================================
// LANGUAGE CHANGE
// ============================================================

window.addEventListener(
    "cleanplan:languagechange",
    function () {

        refreshPropertiesLanguage();

    }
);


// ============================================================
// INIT
// ============================================================

async function initPropertiesPage() {

    const result =
        await checkAdmin();


    if (
        !result
    ) {

        return;

    }


    // ========================================================
    // COLLAPSED BY DEFAULT
    // ========================================================

    setPropertyListOpen(
        false
    );


    // ========================================================
    // LOAD PROPERTIES
    // ========================================================

    await loadProperties();


    // ========================================================
    // FINAL UI SYNC
    // ========================================================

    updatePropertyToggleButton();


    filterPropertyList();

}


// ============================================================
// INITIALIZE
// ============================================================

initPropertiesPage();

