
// ============================================================
// CLEANING APP
// FLOORS
// ============================================================


// ============================================================
// ELEMENTS
// ============================================================

const propertyInfo =
    document.getElementById("propertyInfo");

const floorList =
    document.getElementById("floorList");

const floorForm =
    document.getElementById("floorForm");

const floorNumberInput =
    document.getElementById("floorNumber");

const floorNameInput =
    document.getElementById("floorName");

const saveFloorButton =
    document.getElementById("saveFloorButton");

const floorMessage =
    document.getElementById("floorMessage");

const logoutButton =
    document.getElementById("logoutButton");

const backButton =
    document.getElementById("backButton");


// ============================================================
// PROPERTY ID
// ============================================================

const urlParams =
    new URLSearchParams(
        window.location.search
    );

const propertyId =
    urlParams.get("property_id");


// ============================================================
// STATE
// ============================================================

let editingFloorId = null;


// ============================================================
// MESSAGE
// ============================================================

function showFloorMessage(
    message,
    type = ""
) {

    floorMessage.textContent =
        message;

    floorMessage.className =
        "message " + type;
}


// ============================================================
// LOGOUT
// ============================================================

logoutButton.addEventListener(
    "click",
    async function () {

        await supabaseClient.auth.signOut();

        window.location.href =
            "index.html";

    }
);


// ============================================================
// BACK TO PROPERTIES
// ============================================================

backButton.addEventListener(
    "click",
    function () {

        window.location.href =
            "properties.html";

    }
);


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


    return session;

}


// ============================================================
// LOAD PROPERTY
// ============================================================

async function loadProperty() {

    if (!propertyId) {

        console.error(
            "PROPERTY ID MANGLER I URL"
        );

        propertyInfo.textContent =
            "Ingen bolig er valgt.";

        floorList.innerHTML = `
<p class="message error">
    Ingen bolig er valgt.
</p>
`;

        floorForm.style.display =
            "none";

        return false;
    }


    const {
        data: property,
        error
    } =
        await supabaseClient
            .from("properties")
            .select(
                "id, name, address, floor_count"
            )
            .eq(
                "id",
                propertyId
            )
            .eq(
                "is_active",
                true
            )
            .single();


    if (
        error ||
        !property
    ) {

        console.error(
            "LOAD PROPERTY ERROR:",
            error
        );

        propertyInfo.textContent =
            "Kunne ikke hente bolig.";

        floorList.innerHTML = `
<p class="message error">
    Kunne ikke hente boligen.
</p>
`;

        floorForm.style.display =
            "none";

        return false;
    }


    propertyInfo.innerHTML = `
<strong>
${escapeHtml(property.name)}
</strong>
<br>
    ${escapeHtml(property.address)}
    `;


    return true;

    }


    // ============================================================
    // LOAD FLOORS
    // ============================================================

    async function loadFloors() {

    const {
    data,
    error
} =
    await supabaseClient
    .from("floors")
    .select(
    "id, property_id, floor_number, name, created_at"
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

    floorList.innerHTML = `
            <p class="message error">
                Kunne ikke hente etasjer.
            </p>
        `;

    return;

}


    if (
    !data ||
    data.length === 0
    ) {

    floorList.innerHTML = `
            <p class="empty-state">
                Ingen etasjer er opprettet ennå.
            </p>
        `;

    return;

}


    floorList.innerHTML =
    data.map(
    floor => `

                <div class="property-row">

                    <div>

                        <h3>
                            🏢
                            ${escapeHtml(floor.name)}
                        </h3>

                        <p>
                            Etasje ${floor.floor_number}
                        </p>

                    </div>


                    <div class="property-actions">

                        <button
                            type="button"
                            class="secondary-button edit-floor-button"
                            data-floor-id="${floor.id}"
                            data-floor-number="${floor.floor_number}"
                            data-floor-name="${escapeHtml(floor.name)}"
                        >
                            Rediger
                        </button>


                        <button
                            type="button"
                            class="secondary-button delete-floor-button"
                            data-floor-id="${floor.id}"
                            data-floor-name="${escapeHtml(floor.name)}"
                        >
                            Slett
                        </button>

                    </div>

                </div>

            `
    ).join("");


    // --------------------------------------------------------
    // EDIT BUTTONS
    // --------------------------------------------------------

    document
    .querySelectorAll(
    ".edit-floor-button"
    )
    .forEach(
    function (button) {

    button.addEventListener(
    "click",
    function () {

    startEditFloor(
    button.dataset.floorId,
    button.dataset.floorNumber,
    button.dataset.floorName
    );

}
    );

}
    );


    // --------------------------------------------------------
    // DELETE BUTTONS
    // --------------------------------------------------------

    document
    .querySelectorAll(
    ".delete-floor-button"
    )
    .forEach(
    function (button) {

    button.addEventListener(
    "click",
    function () {

    deleteFloor(
    button.dataset.floorId,
    button.dataset.floorName
    );

}
    );

}
    );

}


    // ============================================================
    // START EDIT
    // ============================================================

    function startEditFloor(
    floorId,
    floorNumber,
    floorName
    ) {

    editingFloorId =
        floorId;


    floorNumberInput.value =
    floorNumber;


    floorNameInput.value =
    floorName;


    saveFloorButton.textContent =
    "Oppdater etasje";


    showFloorMessage(
    "Du redigerer " + floorName + ".",
    "success"
    );


    floorNumberInput.focus();

}


    // ============================================================
    // CANCEL EDIT
    // ============================================================

    function cancelEditFloor() {

    editingFloorId =
        null;


    floorForm.reset();


    saveFloorButton.textContent =
    "Lagre etasje";


    showFloorMessage("");

}


    // ============================================================
    // CREATE / UPDATE FLOOR
    // ============================================================

    floorForm.addEventListener(
    "submit",
    async function (event) {

    event.preventDefault();


    const floorNumber =
    Number(
    floorNumberInput.value
    );


    const floorName =
    floorNameInput.value.trim();


    // ----------------------------------------------------
    // VALIDATION
    // ----------------------------------------------------

    if (
    !Number.isInteger(floorNumber) ||
    floorNumber < 1
    ) {

    showFloorMessage(
    "Skriv inn et gyldig etasjenummer.",
    "error"
    );

    return;

}


    if (!floorName) {

    showFloorMessage(
    "Skriv inn navn på etasjen.",
    "error"
    );

    return;

}


    // ----------------------------------------------------
    // DISABLE BUTTON
    // ----------------------------------------------------

    saveFloorButton.disabled =
    true;


    saveFloorButton.textContent =
    editingFloorId
    ? "Oppdaterer..."
    : "Lagrer...";


    showFloorMessage("");


    // ----------------------------------------------------
    // UPDATE
    // ----------------------------------------------------

    if (editingFloorId) {

    const {
    error
} =
    await supabaseClient
    .from("floors")
    .update({

    floor_number:
    floorNumber,

    name:
    floorName

})
    .eq(
    "id",
    editingFloorId
    )
    .eq(
    "property_id",
    propertyId
    );


    if (error) {

    console.error(
    "UPDATE FLOOR ERROR:",
    error
    );


    if (
    error.code === "23505"
    ) {

    showFloorMessage(
    "Dette etasjenummeret er allerede registrert for boligen.",
    "error"
    );

}

    else if (
    error.code === "42501"
    ) {

    showFloorMessage(
    "Du har ikke tilgang til å endre denne etasjen.",
    "error"
    );

}

    else {

    showFloorMessage(
    "Kunne ikke oppdatere etasjen.",
    "error"
    );

}


    saveFloorButton.disabled =
    false;


    saveFloorButton.textContent =
    "Oppdater etasje";


    return;

}


    showFloorMessage(
    "Etasjen ble oppdatert.",
    "success"
    );


    editingFloorId =
    null;


    floorForm.reset();


    saveFloorButton.textContent =
    "Lagre etasje";


    await loadFloors();


    saveFloorButton.disabled =
    false;


    saveFloorButton.textContent =
    "Lagre etasje";


    return;

}


    // ----------------------------------------------------
    // INSERT
    // ----------------------------------------------------

    const {
    error
} =
    await supabaseClient
    .from("floors")
    .insert({

    property_id:
    propertyId,

    floor_number:
    floorNumber,

    name:
    floorName

});


    if (error) {

    console.error(
    "CREATE FLOOR ERROR:",
    error
    );


    if (
    error.code === "23505"
    ) {

    showFloorMessage(
    "Dette etasjenummeret er allerede registrert for boligen.",
    "error"
    );

}

    else if (
    error.code === "42501"
    ) {

    showFloorMessage(
    "Du har ikke tilgang til å opprette denne etasjen.",
    "error"
    );

}

    else {

    showFloorMessage(
    "Kunne ikke lagre etasjen.",
    "error"
    );

}


    saveFloorButton.disabled =
    false;


    saveFloorButton.textContent =
    "Lagre etasje";


    return;

}


    showFloorMessage(
    "Etasjen ble lagret.",
    "success"
    );


    floorForm.reset();


    await loadFloors();


    saveFloorButton.disabled =
    false;


    saveFloorButton.textContent =
    "Lagre etasje";

}
    );


    // ============================================================
    // DELETE FLOOR
    // ============================================================

    async function deleteFloor(
    floorId,
    floorName
    ) {

    const confirmed =
    window.confirm(
    "Er du sikker på at du vil slette " +
    floorName +
    "?"
    );


    if (!confirmed) {

    return;

}


    const {
    error
} =
    await supabaseClient
    .from("floors")
    .delete()
    .eq(
    "id",
    floorId
    )
    .eq(
    "property_id",
    propertyId
    );


    if (error) {

    console.error(
    "DELETE FLOOR ERROR:",
    error
    );


    if (
    error.code === "42501"
    ) {

    showFloorMessage(
    "Du har ikke tilgang til å slette denne etasjen.",
    "error"
    );

}

    else {

    showFloorMessage(
    "Kunne ikke slette etasjen.",
    "error"
    );

}


    return;

}


    showFloorMessage(
    "Etasjen ble slettet.",
    "success"
    );


    await loadFloors();

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
    // START
    // ============================================================

    async function initFloorsPage() {

    const session =
    await checkAdmin();


    if (!session) {

    return;

}


    const propertyLoaded =
    await loadProperty();


    if (!propertyLoaded) {

    return;

}


    await loadFloors();

}



    initFloorsPage();
