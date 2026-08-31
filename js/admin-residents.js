
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
// CURRENT USER
// ============================================================

let currentSession = null;
let currentProfile = null;


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
                profile.role === "resident"
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

    ${escapeHtml(profile.full_name)}
    — ${escapeHtml(profile.email)}

</option>

`
        ).join("");

}


// ============================================================
// LOAD PROPERTIES
// ============================================================

async function loadProperties() {

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

    ${escapeHtml(property.name)}
    — ${escapeHtml(property.address)}

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


// ============================================================
// LOAD RESIDENTS
// ============================================================

async function loadResidents() {

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


        residentList.innerHTML = `

<p class="message error">
    Kunne ikke hente beboere.
</p>

`;

        return;

    }


    if (
        !data ||
        data.length === 0
    ) {

        residentList.innerHTML = `

<p class="empty-state">
    Ingen beboere er registrert ennå.
</p>

`;

        return;

    }


    residentList.innerHTML =
        data.map(
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


                const floorName =
                    floor
                        ? (
                            floor.name ||
                            `${floor.floor_number}. etasje`
                        )
                        : "Ingen etasje";


                return `

<div class="property-row">

    <div>

    <h3>
            👤 ${escapeHtml(residentName)}
</h3>

<p>
    ${escapeHtml(residentEmail)}
</p>

<div class="property-meta">

            <span>
                🏠 ${escapeHtml(propertyName)}
            </span>

    <span>
                ${escapeHtml(floorName)}
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

}


// ============================================================
// CREATE RESIDENT
// ============================================================

residentForm.addEventListener(
    "submit",
    async function (event) {

        event.preventDefault();


        const profileId =
            residentProfileSelect.value;

        const propertyId =
            residentPropertySelect.value;

        const floorId =
            residentFloorSelect.value;


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


        saveResidentButton.disabled =
            true;

        saveResidentButton.textContent =
            "Oppretter...";


        showResidentMessage("");


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
                error.code === "23505"
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


            saveResidentButton.disabled =
                false;

            saveResidentButton.textContent =
                "Opprett beboer";

            return;

        }


        showResidentMessage(
            "Beboeren ble opprettet.",
            "success"
        );


        residentForm.reset();


        residentFloorSelect.innerHTML = `

<option value="">
    Velg bolig først
</option>

    `;

        residentFloorSelect.disabled =
            true;


        await loadResidents();


        saveResidentButton.disabled =
            false;

        saveResidentButton.textContent =
            "Opprett beboer";

    }
);


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

async function initResidentsPage() {

    const result =
        await checkAdmin();


    if (!result) {

        return;

    }


    await Promise.all([
        loadUserProfiles(),
        loadProperties(),
        loadResidents()
    ]);

}


initResidentsPage();

