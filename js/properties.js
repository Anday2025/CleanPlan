
// ============================================================
// CLEANING APP
// PROPERTIES
// ============================================================


// ============================================================
// ELEMENTS
// ============================================================

const propertyForm =
    document.getElementById("propertyForm");

const propertyNameInput =
    document.getElementById("propertyName");

const propertyAddressInput =
    document.getElementById("propertyAddress");

const floorCountInput =
    document.getElementById("floorCount");

const savePropertyButton =
    document.getElementById("savePropertyButton");

const propertyMessage =
    document.getElementById("propertyMessage");

const propertyList =
    document.getElementById("propertyList");

const logoutButton =
    document.getElementById("logoutButton");

const backButton =
    document.getElementById("backButton");


// ============================================================
// MESSAGE
// ============================================================

function showPropertyMessage(
    message,
    type = ""
) {

    propertyMessage.textContent =
        message;

    propertyMessage.className =
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
// AUTH + ADMIN CHECK
// ============================================================

async function checkAdmin() {

    const {
        data: { session },
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
            profile.role !== "superadmin" &&
            profile.role !== "admin"
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


    return {
        session,
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


    if (section) {

        return section;
    }


    section =
        document.createElement("section");

    section.id =
        "deactivatedPropertiesSection";

    section.className =
        "properties-section";


    section.innerHTML = `

<h2>
Deaktiverte boliger
</h2>

<p class="section-description">
    Deaktiverte boliger kan gjenopprettes
    i opptil 2 måneder.
</p>

<div id="deactivatedPropertyList">
</div>

    `;


    const parent =
        propertyList.parentElement;


    if (parent) {

        parent.appendChild(section);

    }


    return section;

}


// ============================================================
// FORMAT DATE
// ============================================================

function formatNorwegianDate(
    value
) {

    if (!value) {

        return "";

    }


    const date =
        new Date(value);


    if (
        Number.isNaN(
            date.getTime()
        )
    ) {

        return "";

    }


    return date.toLocaleDateString(
        "no-NO",
        {
            day: "2-digit",
            month: "2-digit",
            year: "numeric"
        }
    );

}


// ============================================================
// FORMAT DATE + TIME
// ============================================================

function formatNorwegianDateTime(
    value
) {

    if (!value) {

        return "";

    }


    const date =
        new Date(value);


    if (
        Number.isNaN(
            date.getTime()
        )
    ) {

        return "";

    }


    return date.toLocaleString(
        "no-NO",
        {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit"
        }
    );

}


// ============================================================
// AUDIT ACTION LABEL
// ============================================================

function getAuditActionLabel(
    action
) {

    switch (action) {

        case "created":
            return "🟢 Opprettet av";

        case "updated":
            return "✏️ Endret av";

        case "deactivated":
            return "🔴 Deaktivert av";

        case "restored":
            return "↩️ Gjenopprettet av";

        case "deleted":
            return "🗑️ Permanent slettet av";

        case "permanently_deleted":
            return "🗑️ Permanent slettet av";

        default:
            return "ℹ️ " + action;

    }

}


// ============================================================
// LOAD PROPERTY HISTORY
// ============================================================

async function loadPropertyHistory(
    propertyId
) {

    if (!propertyId) {

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


    if (error) {

        console.error(
            "LOAD PROPERTY HISTORY ERROR:",
            error
        );

        return null;
    }


    return data || [];

}


// ============================================================
// CREATE HISTORY HTML
// ============================================================

function createHistoryHtml(
    history
) {

    if (history === null) {

        return `

<div class="property-history-error">

    <p class="message error">
    Kunne ikke hente historikken.
</p>

</div>

`;

    }


    if (
        !history ||
        history.length === 0
    ) {

        return `

<div class="property-history">

    <p class="empty-state">
    Ingen aktivitet registrert.
</p>

</div>

`;

    }


    return `

<div class="property-history">

    <h4>
        📋 Aktivitet / historikk
</h4>

<div class="property-history-list">

    ${history.map(
    entry => `

<div class="property-history-item">

    <div class="property-history-action">

        ${getAuditActionLabel(
        entry.action
    )}

    </div>

    <div class="property-history-user">

        ${escapeHtml(
        entry.performed_by_name ||
        "Ukjent bruker"
    )}

    </div>

    <div class="property-history-time">

        ${formatNorwegianDateTime(
        entry.performed_at
    )}

    </div>

</div>

`
).join("")}

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
        button.dataset.propertyId;

    const historyContainer =
        document.getElementById(
            "property-history-" +
            propertyId
        );


    if (!propertyId || !historyContainer) {

        return;
    }


    const isOpen =
        historyContainer.style.display !==
        "none";


    if (isOpen) {

        historyContainer.style.display =
            "none";

        button.textContent =
            "📋 Historikk";

        return;
    }


    button.disabled =
        true;

    button.textContent =
        "Laster...";


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
        "📋 Skjul historikk";

}


// ============================================================
// LOAD PROPERTIES
// ============================================================

async function loadProperties() {

    const {
        data,
        error
    } =
        await supabaseClient
            .from("properties")
            .select(
                "id, name, address, floor_count, is_active, created_at, deactivated_at, scheduled_deletion_at"
            )
            .order(
                "created_at",
                {
                    ascending: false
                }
            );


    if (error) {

        console.error(
            "LOAD PROPERTIES ERROR:",
            error
        );


        propertyList.innerHTML = `
<p class="message error">
    Kunne ikke hente boliger.
</p>
`;

        return;
    }


    const activeProperties =
        (data || []).filter(
            property =>
                property.is_active === true
        );


    const deactivatedProperties =
        (data || []).filter(
            property =>
                property.is_active === false
        );


    // ========================================================
    // ACTIVE PROPERTIES
    // ========================================================

    if (
        activeProperties.length === 0
    ) {

        propertyList.innerHTML = `
<p class="empty-state">
    Ingen aktive boliger er opprettet ennå.
</p>
`;

    } else {

        propertyList.innerHTML =
            activeProperties.map(
                property => `

<div class="property-row">

    <div>

    <h3>
            🏠 ${escapeHtml(property.name)}
</h3>

<p>
    ${escapeHtml(property.address)}
</p>

<div class="property-meta">

            <span>
                ${property.floor_count}
                etasje(r)
            </span>

</div>

</div>


<div class="property-actions">

    <button
        type="button"
        class="secondary-button property-open-button"
        data-property-id="${property.id}"
    >
        Åpne →
    </button>

    <button
        type="button"
        class="secondary-button property-history-button"
        data-property-id="${property.id}"
    >
        📋 Historikk
    </button>

    <button
        type="button"
        class="secondary-button property-deactivate-button"
        data-property-id="${property.id}"
        data-property-name="${escapeHtml(property.name)}"
    >
        Deaktiver bolig
    </button>

</div>


<div
    id="property-history-${property.id}"
    class="property-history-container"
    style="display: none;"
></div>

</div>

`
            ).join("");

    }


    // ========================================================
    // OPEN PROPERTY BUTTONS
    // ========================================================

    const openButtons =
        document.querySelectorAll(
            ".property-open-button"
        );


    openButtons.forEach(
        function (button) {

            button.addEventListener(
                "click",
                function () {

                    const propertyId =
                        button.dataset.propertyId;


                    if (!propertyId) {

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
        document.querySelectorAll(
            ".property-history-button"
        );


    historyButtons.forEach(
        function (button) {

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
        document.querySelectorAll(
            ".property-deactivate-button"
        );


    deactivateButtons.forEach(
        function (button) {

            button.addEventListener(
                "click",
                async function () {

                    const propertyId =
                        button.dataset.propertyId;

                    const propertyName =
                        button.dataset.propertyName;


                    if (!propertyId) {

                        return;
                    }


                    const confirmed =
                        window.confirm(
                            "Vil du deaktivere boligen \"" +
                            propertyName +
                            "\"?\n\n" +
                            "Boligen blir ikke slettet med en gang. " +
                            "Den kan gjenopprettes i 2 måneder " +
                            "før permanent sletting."
                        );


                    if (!confirmed) {

                        return;
                    }


                    button.disabled =
                        true;

                    button.textContent =
                        "Deaktiverer...";


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


                    if (error) {

                        console.error(
                            "DEACTIVATE PROPERTY ERROR:",
                            error
                        );


                        showPropertyMessage(
                            "Kunne ikke deaktivere boligen.",
                            "error"
                        );


                        button.disabled =
                            false;

                        button.textContent =
                            "Deaktiver bolig";

                        return;
                    }


                    if (!result) {

                        showPropertyMessage(
                            "Boligen kunne ikke deaktiveres.",
                            "error"
                        );


                        button.disabled =
                            false;

                        button.textContent =
                            "Deaktiver bolig";

                        return;
                    }


                    showPropertyMessage(
                        "Boligen ble deaktivert.",
                        "success"
                    );


                    await loadProperties();

                }
            );

        }
    );


    // ========================================================
    // DEACTIVATED PROPERTIES
    // ========================================================

    renderDeactivatedProperties(
        deactivatedProperties
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


    if (!list) {

        return;
    }


    if (
        !properties ||
        properties.length === 0
    ) {

        section.style.display =
            "none";

        return;
    }


    section.style.display =
        "";


    list.innerHTML =
        properties.map(
            property => {

                const deletionDate =
                    formatNorwegianDate(
                        property.scheduled_deletion_at
                    );


                return `

<div class="property-row">

    <div>

    <h3>
            🏠 ${escapeHtml(property.name)}
</h3>

<p>
    ${escapeHtml(property.address)}
</p>

<div class="property-meta">

            <span>
                ${property.floor_count}
                etasje(r)
            </span>

    <span>
                Deaktivert:
                ${formatNorwegianDate(
        property.deactivated_at
    )}
            </span>

    <span>
                Permanent sletting:
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
        📋 Historikk
    </button>

    <button
        type="button"
        class="primary-button property-restore-button"
        data-property-id="${property.id}"
    >
        ↩ Gjenopprett bolig
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
        ).join("");


    // ========================================================
    // HISTORY BUTTONS FOR DEACTIVATED PROPERTIES
    // ========================================================

    const historyButtons =
        document.querySelectorAll(
            ".property-history-button"
        );


    historyButtons.forEach(
        function (button) {

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
        document.querySelectorAll(
            ".property-restore-button"
        );


    restoreButtons.forEach(
        function (button) {

            button.addEventListener(
                "click",
                async function () {

                    const propertyId =
                        button.dataset.propertyId;


                    if (!propertyId) {

                        return;
                    }


                    const confirmed =
                        window.confirm(
                            "Vil du gjenopprette denne boligen?"
                        );


                    if (!confirmed) {

                        return;
                    }


                    button.disabled =
                        true;

                    button.textContent =
                        "Gjenoppretter...";


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


                    if (error) {

                        console.error(
                            "RESTORE PROPERTY ERROR:",
                            error
                        );


                        showPropertyMessage(
                            "Kunne ikke gjenopprette boligen.",
                            "error"
                        );


                        button.disabled =
                            false;

                        button.textContent =
                            "↩ Gjenopprett bolig";

                        return;
                    }


                    if (!result) {

                        showPropertyMessage(
                            "Boligen kunne ikke gjenopprettes. " +
                            "2-månedersfristen kan være utløpt.",
                            "error"
                        );


                        button.disabled =
                            false;

                        button.textContent =
                            "↩ Gjenopprett bolig";

                        return;
                    }


                    showPropertyMessage(
                        "Boligen ble gjenopprettet.",
                        "success"
                    );


                    await loadProperties();

                }
            );

        }
    );

}


// ============================================================
// ESCAPE HTML
// ============================================================

function escapeHtml(value) {

    const div =
        document.createElement("div");

    div.textContent =
        value ?? "";

    return div.innerHTML;

}


// ============================================================
// CREATE PROPERTY
// ============================================================

propertyForm.addEventListener(
    "submit",
    async function (event) {

        event.preventDefault();


        const name =
            propertyNameInput.value.trim();

        const address =
            propertyAddressInput.value.trim();

        const floorCount =
            Number(
                floorCountInput.value
            );


        // ----------------------------------------------------
        // VALIDATION
        // ----------------------------------------------------

        if (
            !name ||
            !address ||
            !floorCount ||
            floorCount < 1
        ) {

            showPropertyMessage(
                "Fyll inn alle feltene.",
                "error"
            );

            return;
        }


        // ----------------------------------------------------
        // DISABLE BUTTON
        // ----------------------------------------------------

        savePropertyButton.disabled =
            true;

        savePropertyButton.textContent =
            "Lagrer...";


        showPropertyMessage("");


        // ----------------------------------------------------
        // INSERT
        // ----------------------------------------------------

        const {
            error
        } =
        await supabaseClient
            .from("properties")
            .insert({

                name:
                    name,

                address:
                    address,

                floor_count:
                    floorCount,

                is_active:
                    true

            });


        // ----------------------------------------------------
        // INSERT ERROR
        // ----------------------------------------------------

        if (error) {

            console.error(
                "CREATE PROPERTY ERROR:",
                error
            );


            if (
                error.code === "23505"
            ) {

                showPropertyMessage(
                    "Denne adressen er allerede registrert.",
                    "error"
                );

            } else {

                showPropertyMessage(
                    "Kunne ikke lagre boligen.",
                    "error"
                );

            }


            savePropertyButton.disabled =
                false;

            savePropertyButton.textContent =
                "Lagre bolig";

            return;
        }


        // ----------------------------------------------------
        // SUCCESS
        // ----------------------------------------------------

        showPropertyMessage(
            "Boligen ble lagret.",
            "success"
        );


        propertyForm.reset();


        floorCountInput.value =
            "1";


        // ----------------------------------------------------
        // RELOAD LIST
        // ----------------------------------------------------

        await loadProperties();


        // ----------------------------------------------------
        // ENABLE BUTTON
        // ----------------------------------------------------

        savePropertyButton.disabled =
            false;

        savePropertyButton.textContent =
            "Lagre bolig";

    }
);


// ============================================================
// START
// ============================================================

async function initPropertiesPage() {

    const result =
        await checkAdmin();


    if (!result) {

        return;
    }


    await loadProperties();

}


initPropertiesPage();

