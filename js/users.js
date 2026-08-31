
// ============================================================
// CLEANING APP
// USER MANAGEMENT
// ============================================================


// ============================================================
// ELEMENTS
// ============================================================

const logoutButton =
    document.getElementById("logoutButton");

const backButton =
    document.getElementById("backButton");

const userForm =
    document.getElementById("userForm");

const fullNameInput =
    document.getElementById("fullName");

const emailInput =
    document.getElementById("email");

const roleSelect =
    document.getElementById("role");

const createUserButton =
    document.getElementById("createUserButton");

const userMessage =
    document.getElementById("userMessage");

const userList =
    document.getElementById("userList");

const adminName =
    document.getElementById("adminName");


// ============================================================
// CURRENT PROFILE
// ============================================================

let currentProfile = null;


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
// BACK
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
// MESSAGE
// ============================================================

function showMessage(
    message,
    type = "info"
) {

    if (!userMessage) {
        return;
    }

    userMessage.textContent =
        message;

    userMessage.className =
        "message " + type;

}


// ============================================================
// LOAD CURRENT USER
// ============================================================

async function loadCurrentUser() {

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
                "id, full_name, email, role, is_active"
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


    // ========================================================
    // ACCESS CONTROL
    // ========================================================

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


    currentProfile =
        profile;


    // ========================================================
    // HEADER
    // ========================================================

    if (adminName) {

        adminName.textContent =
            profile.full_name;

    }


    // ========================================================
    // ROLE OPTIONS
    // ========================================================

    configureRoleOptions(
        profile.role
    );


    return profile;

}


// ============================================================
// CONFIGURE ROLE OPTIONS
// ============================================================
//
// ROLE RULES:
//
// Superadmin
//     -> Admin
//     -> Resident
//
// Admin
//     -> Resident
//
// Nobody
//     -> Superadmin
//
// ============================================================

function configureRoleOptions(
    currentRole
) {

    if (!roleSelect) {
        return;
    }


    roleSelect.innerHTML =
        "";


    // --------------------------------------------------------
    // DEFAULT
    // --------------------------------------------------------

    const defaultOption =
        document.createElement(
            "option"
        );

    defaultOption.value =
        "";

    defaultOption.textContent =
        "Velg rolle";

    defaultOption.selected =
        true;

    defaultOption.disabled =
        true;

    roleSelect.appendChild(
        defaultOption
    );


    // --------------------------------------------------------
    // SUPERADMIN
    // --------------------------------------------------------

    if (
        currentRole ===
        "superadmin"
    ) {

        addRoleOption(
            "admin",
            "Admin"
        );

        addRoleOption(
            "resident",
            "Resident"
        );

    }


    // --------------------------------------------------------
    // ADMIN
    // --------------------------------------------------------

    else if (
        currentRole ===
        "admin"
    ) {

        addRoleOption(
            "resident",
            "Resident"
        );

    }

}


// ============================================================
// ADD ROLE OPTION
// ============================================================

function addRoleOption(
    value,
    text
) {

    const option =
        document.createElement(
            "option"
        );

    option.value =
        value;

    option.textContent =
        text;

    roleSelect.appendChild(
        option
    );

}


// ============================================================
// CREATE USER
// ============================================================

if (userForm) {

    userForm.addEventListener(
        "submit",
        async function (event) {

            event.preventDefault();


            // ------------------------------------------------
            // CHECK CURRENT PROFILE
            // ------------------------------------------------

            if (!currentProfile) {

                showMessage(
                    "Kunne ikke kontrollere brukerrollen.",
                    "error"
                );

                return;

            }


            // ------------------------------------------------
            // VALUES
            // ------------------------------------------------

            const fullName =
                fullNameInput
                    ? fullNameInput.value.trim()
                    : "";


            const email =
                emailInput
                    ? emailInput.value.trim().toLowerCase()
                    : "";


            const role =
                roleSelect
                    ? roleSelect.value
                    : "";


            // ------------------------------------------------
            // BASIC VALIDATION
            // ------------------------------------------------

            if (
                !fullName ||
                !email ||
                !role
            ) {

                showMessage(
                    "Fyll ut alle feltene.",
                    "error"
                );

                return;

            }


            // ------------------------------------------------
            // EMAIL VALIDATION
            // ------------------------------------------------

            const emailPattern =
                /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


            if (
                !emailPattern.test(email)
            ) {

                showMessage(
                    "Skriv inn en gyldig e-postadresse.",
                    "error"
                );

                return;

            }


            // ------------------------------------------------
            // FRONTEND ROLE SECURITY
            // ------------------------------------------------
            //
            // This is only an additional UI check.
            // The Edge Function MUST enforce this again.
            //
            // ------------------------------------------------

            if (
                currentProfile.role ===
                "admin" &&
                role !== "resident"
            ) {

                showMessage(
                    "Admin kan bare opprette Resident-brukere.",
                    "error"
                );

                return;

            }


            if (
                currentProfile.role ===
                "superadmin" &&
                ![
                    "admin",
                    "resident"
                ].includes(role)
            ) {

                showMessage(
                    "Superadmin kan bare opprette Admin eller Resident.",
                    "error"
                );

                return;

            }


            // ------------------------------------------------
            // DISABLE BUTTON
            // ------------------------------------------------

            if (createUserButton) {

                createUserButton.disabled =
                    true;

                createUserButton.textContent =
                    "Oppretter...";

            }


            showMessage(
                "Oppretter bruker...",
                "info"
            );


            try {

                // ------------------------------------------------
                // CREATE USER THROUGH EDGE FUNCTION
                // ------------------------------------------------

                const {
                    data,
                    error
                } =
                    await supabaseClient
                        .functions
                        .invoke(
                            "admin-create-user",
                            {
                                body: {

                                    full_name:
                                        fullName,

                                    email:
                                        email,

                                    role:
                                        role

                                }
                            }
                        );


                console.log(
                    "CREATE USER RESPONSE:",
                    data
                );


                // ------------------------------------------------
                // EDGE FUNCTION ERROR
                // ------------------------------------------------

                if (error) {

                    console.error(
                        "CREATE USER ERROR:",
                        error
                    );


                    // --------------------------------------------
                    // Try to read server error
                    // --------------------------------------------

                    try {

                        const response =
                            error.context;


                        if (response) {

                            const errorBody =
                                await response.json();


                            console.error(
                                "CREATE USER ERROR BODY:",
                                errorBody
                            );


                            showMessage(
                                errorBody?.error ||
                                error.message ||
                                "Kunne ikke opprette bruker.",
                                "error"
                            );

                        } else {

                            showMessage(
                                error.message ||
                                "Kunne ikke opprette bruker.",
                                "error"
                            );

                        }

                    } catch (bodyError) {

                        console.error(
                            "COULD NOT READ ERROR BODY:",
                            bodyError
                        );


                        showMessage(
                            error.message ||
                            "Kunne ikke opprette bruker.",
                            "error"
                        );

                    }


                    return;

                }


                // ------------------------------------------------
                // FUNCTION RESPONSE ERROR
                // ------------------------------------------------

                if (
                    !data ||
                    data.success !== true
                ) {

                    showMessage(
                        data?.error ||
                        "Kunne ikke opprette bruker.",
                        "error"
                    );

                    return;

                }


                // ------------------------------------------------
                // SUCCESS
                // ------------------------------------------------

                showMessage(
                    "Brukeren ble opprettet. " +
                    "En sikker lenke for å sette passord " +
                    "er sendt til e-postadressen.",
                    "success"
                );


                // ------------------------------------------------
                // RESET FORM
                // ------------------------------------------------

                userForm.reset();


                // ------------------------------------------------
                // REBUILD ROLE OPTIONS
                // ------------------------------------------------

                configureRoleOptions(
                    currentProfile.role
                );


                // ------------------------------------------------
                // RELOAD USER LIST
                // ------------------------------------------------

                await loadUsers();

            } catch (error) {

                console.error(
                    "CREATE USER EXCEPTION:",
                    error
                );


                showMessage(
                    "Det oppstod en feil ved opprettelse av bruker.",
                    "error"
                );

            } finally {

                if (createUserButton) {

                    createUserButton.disabled =
                        false;

                    createUserButton.textContent =
                        "Opprett bruker";

                }

            }

        }
    );

}

// ============================================================
// LOAD USERS
// ============================================================

async function loadUsers() {

    if (!userList) {
        return;
    }


    // --------------------------------------------------------
    // CURRENT USER MUST BE LOADED
    // --------------------------------------------------------

    if (!currentProfile) {

        userList.innerHTML =
            '<p class="empty-state">Kunne ikke kontrollere brukerrollen.</p>';

        return;

    }


    userList.innerHTML =
        '<p class="empty-state">Laster brukere...</p>';


    // ========================================================
    // LOAD USER PROFILES
    // ========================================================

    const {
        data: users,
        error
    } =
        await supabaseClient
            .from("profiles")
            .select(
                "id, full_name, email, role, is_active"
            )
            .order(
                "full_name",
                {
                    ascending: true
                }
            );


    // --------------------------------------------------------
    // DATABASE ERROR
    // --------------------------------------------------------

    if (error) {

        console.error(
            "LOAD USERS ERROR:",
            error
        );


        userList.innerHTML =
            '<p class="empty-state">Kunne ikke laste brukere.</p>';

        return;

    }


    // ========================================================
    // FILTER USERS BY CURRENT ROLE
    // ========================================================
    //
    // SUPERADMIN:
    //     -> sees everyone
    //
    // ADMIN:
    //     -> does NOT see Superadmin
    //     -> can see Admin
    //     -> can see Resident
    //
    // ========================================================

    let visibleUsers =
        users || [];


    if (
        currentProfile.role ===
        "admin"
    ) {

        visibleUsers =
            visibleUsers.filter(
                function (user) {

                    return (
                        user.role !==
                        "superadmin"
                    );

                }
            );

    }


    // ========================================================
    // EMPTY STATE
    // ========================================================

    if (
        visibleUsers.length ===
        0
    ) {

        userList.innerHTML =
            '<p class="empty-state">Ingen brukere registrert.</p>';

        return;

    }


    // ========================================================
    // RENDER USERS
    // ========================================================

    userList.innerHTML =
        "";


    visibleUsers.forEach(
        function (user) {

            // ------------------------------------------------
            // CARD
            // ------------------------------------------------

            const card =
                document.createElement(
                    "div"
                );

            card.className =
                "resident-item";


            // ------------------------------------------------
            // NAME
            // ------------------------------------------------

            const name =
                document.createElement(
                    "h3"
                );

            name.textContent =
                "👤 " +
                user.full_name;


            // ------------------------------------------------
            // EMAIL
            // ------------------------------------------------

            const email =
                document.createElement(
                    "p"
                );

            email.textContent =
                user.email;


            // ------------------------------------------------
            // ROLE
            // ------------------------------------------------

            const role =
                document.createElement(
                    "p"
                );

            role.textContent =
                "Rolle: " +
                formatRole(
                    user.role
                );


            // ------------------------------------------------
            // STATUS
            // ------------------------------------------------

            const status =
                document.createElement(
                    "p"
                );

            status.textContent =
                user.is_active
                    ? "Aktiv"
                    : "Deaktivert";


            // ------------------------------------------------
            // APPEND
            // ------------------------------------------------

            card.appendChild(
                name
            );

            card.appendChild(
                email
            );

            card.appendChild(
                role
            );

            card.appendChild(
                status
            );


            userList.appendChild(
                card
            );

        }
    );

}




// ============================================================
// FORMAT ROLE
// ============================================================

function formatRole(
    role
) {

    switch (role) {

        case "superadmin":
            return "Superadmin";

        case "admin":
            return "Admin";

        case "resident":
            return "Resident";

        default:
            return role || "Ukjent";

    }

}


// ============================================================
// START
// ============================================================

async function start() {

    const profile =
        await loadCurrentUser();


    if (!profile) {
        return;
    }


    await loadUsers();

}


start();
