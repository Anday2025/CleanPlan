// ============================================================
// CLEANING APP
// USER MANAGEMENT
// ============================================================


// ============================================================
// ELEMENTS
// ============================================================

const logoutButton =
    document.getElementById(
        "logoutButton"
    );

const backButton =
    document.getElementById(
        "backButton"
    );

const userForm =
    document.getElementById(
        "userForm"
    );

const fullNameInput =
    document.getElementById(
        "fullName"
    );

const emailInput =
    document.getElementById(
        "email"
    );

const roleSelect =
    document.getElementById(
        "role"
    );

const createUserButton =
    document.getElementById(
        "createUserButton"
    );

const userMessage =
    document.getElementById(
        "userMessage"
    );

const userList =
    document.getElementById(
        "userList"
    );

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
// USER LIST ELEMENTS
// ============================================================

const registeredUsersContent =
    document.getElementById(
        "registeredUsersContent"
    );

const toggleUsersButton =
    document.getElementById(
        "toggleUsersButton"
    );

const toggleUsersText =
    document.getElementById(
        "toggleUsersText"
    );

const toggleUsersIcon =
    document.getElementById(
        "toggleUsersIcon"
    );

const userCountBadge =
    document.getElementById(
        "userCountBadge"
    );

const userSearchInput =
    document.getElementById(
        "userSearchInput"
    );

const clearUserSearchButton =
    document.getElementById(
        "clearUserSearchButton"
    );

const userSearchCount =
    document.getElementById(
        "userSearchCount"
    );

const userSearchEmpty =
    document.getElementById(
        "userSearchEmpty"
    );


// ============================================================
// CURRENT PROFILE
// ============================================================

let currentProfile =
    null;


// ============================================================
// USER LIST STATE
// ============================================================

let visibleUserCount =
    0;


// ============================================================
// LOGOUT
// ============================================================

if (logoutButton) {

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
// USER WORD
// ============================================================

function getUserWord(
    count
) {

    return count === 1
        ? "bruker"
        : "brukere";

}


// ============================================================
// UPDATE TOGGLE BUTTON
// ============================================================

function updateUsersToggleButton() {

    if (
        !toggleUsersButton ||
        !registeredUsersContent
    ) {

        return;

    }


    const isOpen =
        !registeredUsersContent.hidden;


    if (toggleUsersText) {

        toggleUsersText.textContent =
            (
                isOpen
                    ? "Skjul brukere"
                    : "Vis brukere"
            ) +
            ` (${visibleUserCount})`;

    }


    if (toggleUsersIcon) {

        toggleUsersIcon.textContent =
            isOpen
                ? "⌃"
                : "⌄";

    }


    toggleUsersButton.setAttribute(
        "aria-expanded",
        isOpen
            ? "true"
            : "false"
    );

}


// ============================================================
// OPEN / CLOSE USER LIST
// ============================================================

function setUserListOpen(
    shouldOpen
) {

    if (!registeredUsersContent) {

        return;

    }


    registeredUsersContent.hidden =
        !shouldOpen;


    updateUsersToggleButton();


    if (
        shouldOpen &&
        userSearchInput
    ) {

        window.setTimeout(
            function () {

                userSearchInput.focus();

            },
            50
        );

    }

}


// ============================================================
// UPDATE SEARCH RESULT COUNT
// ============================================================

function updateUserSearchCount(
    count
) {

    if (!userSearchCount) {

        return;

    }


    userSearchCount.textContent =
        `${count} ${getUserWord(count)} funnet`;

}


// ============================================================
// FILTER USERS
// ============================================================

function filterUserList() {

    if (!userList) {

        return;

    }


    const query =
        userSearchInput
            ? userSearchInput
                .value
                .trim()
                .toLocaleLowerCase(
                    "nb-NO"
                )
            : "";


    const rows =
        Array.from(
            userList.querySelectorAll(
                ".admin-user-row"
            )
        );


    let matchingCount =
        0;


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

                matchingCount +=
                    1;

            }

        }
    );


    if (clearUserSearchButton) {

        clearUserSearchButton.hidden =
            query.length === 0;

    }


    if (userSearchEmpty) {

        userSearchEmpty.hidden =
            !(
                query &&
                rows.length > 0 &&
                matchingCount === 0
            );

    }


    updateUserSearchCount(
        query
            ? matchingCount
            : visibleUserCount
    );

}


// ============================================================
// TOGGLE USER LIST
// ============================================================

if (toggleUsersButton) {

    toggleUsersButton.addEventListener(
        "click",
        function () {

            if (!registeredUsersContent) {

                return;

            }


            setUserListOpen(
                registeredUsersContent.hidden
            );

        }
    );

}


// ============================================================
// SEARCH USERS
// ============================================================

if (userSearchInput) {

    userSearchInput.addEventListener(
        "input",
        filterUserList
    );

}


// ============================================================
// CLEAR USER SEARCH
// ============================================================

if (clearUserSearchButton) {

    clearUserSearchButton.addEventListener(
        "click",
        function () {

            if (!userSearchInput) {

                return;

            }


            userSearchInput.value =
                "";


            filterUserList();


            userSearchInput.focus();

        }
    );

}


// ============================================================
// LOAD CURRENT USER
// ============================================================

async function loadCurrentUser() {

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


    currentProfile =
        profile;


    // ========================================================
    // HEADER
    // ========================================================

    if (adminName) {

        adminName.textContent =
            profile.full_name;

    }


    if (adminRole) {

        adminRole.textContent =
            formatRole(
                profile.role
            );

    }


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
                    ? fullNameInput
                        .value
                        .trim()
                    : "";


            const email =
                emailInput
                    ? emailInput
                        .value
                        .trim()
                        .toLowerCase()
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
                !emailPattern.test(
                    email
                )
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
            // Additional UI check.
            // Edge Function also enforces these rules.
            //
            // ------------------------------------------------

            if (
                currentProfile.role ===
                "admin" &&
                role !==
                "resident"
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
                ].includes(
                    role
                )
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
                                await response
                                    .json();


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

                    } catch (
                        bodyError
                        ) {

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
                    data.success !==
                    true
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


            } catch (
                error
                ) {

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

        visibleUserCount =
            0;


        updateUserListCounters();


        userList.innerHTML = `

            <p class="empty-state">
                Kunne ikke kontrollere brukerrollen.
            </p>

        `;


        return;

    }


    userList.innerHTML = `

        <p class="empty-state">
            Laster brukere...
        </p>

    `;


    // ========================================================
    // LOAD USER PROFILES
    // ========================================================

    const {
        data: users,
        error
    } =
        await supabaseClient
            .from(
                "profiles"
            )
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


        visibleUserCount =
            0;


        updateUserListCounters();


        userList.innerHTML = `

            <p class="empty-state">
                Kunne ikke laste brukere.
            </p>

        `;


        return;

    }


    // ========================================================
    // FILTER USERS BY CURRENT ROLE
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
    // COUNT
    // ========================================================

    visibleUserCount =
        visibleUsers.length;


    updateUserListCounters();


    // ========================================================
    // EMPTY STATE
    // ========================================================

    if (
        visibleUsers.length ===
        0
    ) {

        userList.innerHTML = `

            <p class="empty-state">
                Ingen brukere registrert.
            </p>

        `;


        if (userSearchEmpty) {

            userSearchEmpty.hidden =
                true;

        }


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
            // VALUES
            // ------------------------------------------------

            const formattedRole =
                formatRole(
                    user.role
                );


            const statusText =
                user.is_active
                    ? "Aktiv"
                    : "Deaktivert";


            const searchText =
                (
                    (user.full_name || "") +
                    " " +
                    (user.email || "") +
                    " " +
                    formattedRole +
                    " " +
                    statusText
                )
                    .trim()
                    .toLocaleLowerCase(
                        "nb-NO"
                    );


            // ------------------------------------------------
            // ROW
            // ------------------------------------------------

            const row =
                document.createElement(
                    "div"
                );


            row.className =
                "resident-item admin-user-row";


            row.dataset.searchText =
                searchText;


            // ------------------------------------------------
            // CONTENT
            // ------------------------------------------------

            const content =
                document.createElement(
                    "div"
                );


            content.className =
                "admin-user-row-content";


            // ------------------------------------------------
            // NAME
            // ------------------------------------------------

            const name =
                document.createElement(
                    "h3"
                );


            name.textContent =
                "👤 " +
                (
                    user.full_name ||
                    "Ukjent bruker"
                );


            // ------------------------------------------------
            // EMAIL
            // ------------------------------------------------

            const email =
                document.createElement(
                    "p"
                );


            email.className =
                "admin-user-email";


            email.textContent =
                user.email || "";


            // ------------------------------------------------
            // META
            // ------------------------------------------------

            const meta =
                document.createElement(
                    "div"
                );


            meta.className =
                "admin-user-meta";


            // ------------------------------------------------
            // ROLE
            // ------------------------------------------------

            const roleBadge =
                document.createElement(
                    "span"
                );


            roleBadge.className =
                "admin-user-role-badge";


            roleBadge.textContent =
                formattedRole;


            meta.appendChild(
                roleBadge
            );


            // ------------------------------------------------
            // CONTENT APPEND
            // ------------------------------------------------

            content.appendChild(
                name
            );


            content.appendChild(
                email
            );


            content.appendChild(
                meta
            );


            // ------------------------------------------------
            // ACTION / STATUS
            // ------------------------------------------------

            const actions =
                document.createElement(
                    "div"
                );


            actions.className =
                "admin-user-row-actions";


            const status =
                document.createElement(
                    "span"
                );


            status.className =
                user.is_active
                    ? "status-active"
                    : "admin-user-status-inactive";


            status.textContent =
                statusText;


            actions.appendChild(
                status
            );


            // ------------------------------------------------
            // ROW APPEND
            // ------------------------------------------------

            row.appendChild(
                content
            );


            row.appendChild(
                actions
            );


            userList.appendChild(
                row
            );

        }
    );


    // ========================================================
    // APPLY CURRENT SEARCH
    // ========================================================

    filterUserList();

}


// ============================================================
// UPDATE USER LIST COUNTERS
// ============================================================

function updateUserListCounters() {

    if (userCountBadge) {

        userCountBadge.textContent =
            String(
                visibleUserCount
            );

    }


    updateUsersToggleButton();


    updateUserSearchCount(
        visibleUserCount
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

            return (
                role ||
                "Ukjent"
            );

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


    // --------------------------------------------------------
    // LIST CLOSED BY DEFAULT
    // --------------------------------------------------------

    setUserListOpen(
        false
    );


    // --------------------------------------------------------
    // LOAD USERS
    // --------------------------------------------------------

    await loadUsers();


    // --------------------------------------------------------
    // FINAL UI SYNC
    // --------------------------------------------------------

    updateUsersToggleButton();


    filterUserList();

}


// ============================================================
// START PAGE
// ============================================================

start();