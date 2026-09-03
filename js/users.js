// ============================================================
// CLEANPLAN
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
// USER DATA CACHE
// ============================================================

let currentVisibleUsers =
    [];


// ============================================================
// USER LIST STATE
// ============================================================

let visibleUserCount =
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
// BACK
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
// MESSAGE
// ============================================================

function showMessage(
    message,
    type = "info"
) {

    if (
        !userMessage
    ) {

        return;

    }


    userMessage.textContent =
        message;


    userMessage.className =
        "message " +
        type;

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


    if (
        toggleUsersText
    ) {

        toggleUsersText.textContent =
            (
                isOpen
                    ? t(
                        "adminHideUsers",
                        {},
                        "Skjul brukere"
                    )
                    : t(
                        "adminShowUsers",
                        {},
                        "Vis brukere"
                    )
            ) +
            " (" +
            visibleUserCount +
            ")";

    }


    if (
        toggleUsersIcon
    ) {

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

    if (
        !registeredUsersContent
    ) {

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

    if (
        !userSearchCount
    ) {

        return;

    }


    userSearchCount.textContent =
        count ===
        1
            ? t(
                "adminUserSingularFound",
                {
                    count:
                    count
                },
                count +
                " bruker funnet"
            )
            : t(
                "adminUserPluralFound",
                {
                    count:
                    count
                },
                count +
                " brukere funnet"
            );

}


// ============================================================
// FILTER USERS
// ============================================================

function filterUserList() {

    if (
        !userList
    ) {

        return;

    }


    const query =
        userSearchInput
            ? userSearchInput
                .value
                .trim()
                .toLocaleLowerCase(
                    getCurrentLocale()
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

                matchingCount +=
                    1;

            }

        }
    );


    if (
        clearUserSearchButton
    ) {

        clearUserSearchButton.hidden =
            query.length ===
            0;

    }


    if (
        userSearchEmpty
    ) {

        userSearchEmpty.hidden =
            !(
                query &&
                rows.length >
                0 &&
                matchingCount ===
                0
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

if (
    toggleUsersButton
) {

    toggleUsersButton.addEventListener(
        "click",
        function () {

            if (
                !registeredUsersContent
            ) {

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

if (
    userSearchInput
) {

    userSearchInput.addEventListener(
        "input",
        filterUserList
    );

}


// ============================================================
// CLEAR USER SEARCH
// ============================================================

if (
    clearUserSearchButton
) {

    clearUserSearchButton.addEventListener(
        "click",
        function () {

            if (
                !userSearchInput
            ) {

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
    // HEADER NAME
    // ========================================================

    if (
        adminName
    ) {

        adminName.textContent =
            profile.full_name ||
            "Administrator";

    }


    // ========================================================
    // HEADER ROLE
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
    // HEADER INITIAL
    // ========================================================

    if (
        adminInitial
    ) {

        const initialSource =
            profile.full_name ||
            profile.email ||
            "A";


        adminInitial.textContent =
            initialSource
                .trim()
                .charAt(
                    0
                )
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
// SECURITY RULES:
//
// Superadmin:
//     -> Admin
//     -> Resident
//
// Admin:
//     -> Resident
//
// Nobody:
//     -> Superadmin
//
// Edge Function must still enforce the same rules server-side.
// ============================================================

function configureRoleOptions(
    currentRole
) {

    if (
        !roleSelect
    ) {

        return;

    }


    const selectedRole =
        roleSelect.value;


    roleSelect.innerHTML =
        "";


    // ========================================================
    // DEFAULT OPTION
    // ========================================================

    const defaultOption =
        document.createElement(
            "option"
        );


    defaultOption.value =
        "";


    defaultOption.textContent =
        t(
            "adminSelectRole",
            {},
            "Velg rolle"
        );


    defaultOption.disabled =
        true;


    roleSelect.appendChild(
        defaultOption
    );


    // ========================================================
    // SUPERADMIN
    // ========================================================

    if (
        currentRole ===
        "superadmin"
    ) {

        addRoleOption(
            "admin",
            t(
                "adminRoleAdmin",
                {},
                "Admin"
            )
        );


        addRoleOption(
            "resident",
            t(
                "adminRoleResident",
                {},
                "Resident"
            )
        );

    }


        // ========================================================
        // ADMIN
    // ========================================================

    else if (
        currentRole ===
        "admin"
    ) {

        addRoleOption(
            "resident",
            t(
                "adminRoleResident",
                {},
                "Resident"
            )
        );

    }


    // ========================================================
    // RESTORE SELECTION
    // ========================================================

    if (
        selectedRole &&
        Array.from(
            roleSelect.options
        ).some(
            function (
                option
            ) {

                return (
                    option.value ===
                    selectedRole
                );

            }
        )
    ) {

        roleSelect.value =
            selectedRole;

    } else {

        roleSelect.value =
            "";

    }

}


// ============================================================
// ADD ROLE OPTION
// ============================================================

function addRoleOption(
    value,
    text
) {

    if (
        !roleSelect
    ) {

        return;

    }


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

if (
    userForm
) {

    userForm.addEventListener(
        "submit",
        async function (
            event
        ) {

            event.preventDefault();


            // ========================================================
            // CHECK CURRENT PROFILE
            // ========================================================

            if (
                !currentProfile
            ) {

                showMessage(
                    t(
                        "adminCouldNotVerifyUserRole",
                        {},
                        "Kunne ikke kontrollere brukerrollen."
                    ),
                    "error"
                );


                return;

            }


            // ========================================================
            // VALUES
            // ========================================================

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


            // ========================================================
            // BASIC VALIDATION
            // ========================================================

            if (
                !fullName ||
                !email ||
                !role
            ) {

                showMessage(
                    t(
                        "adminFillAllUserFields",
                        {},
                        "Fyll ut alle feltene."
                    ),
                    "error"
                );


                return;

            }


            // ========================================================
            // EMAIL VALIDATION
            // ========================================================

            const emailPattern =
                /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


            if (
                !emailPattern.test(
                    email
                )
            ) {

                showMessage(
                    t(
                        "adminEnterValidEmail",
                        {},
                        "Skriv inn en gyldig e-postadresse."
                    ),
                    "error"
                );


                return;

            }


            // ========================================================
            // FRONTEND ROLE SECURITY
            //
            // The Edge Function must also enforce these rules.
            // ========================================================

            if (
                currentProfile.role ===
                "admin" &&
                role !==
                "resident"
            ) {

                showMessage(
                    t(
                        "adminCanOnlyCreateResident",
                        {},
                        "Admin kan bare opprette Resident-brukere."
                    ),
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
                    t(
                        "superadminCanOnlyCreateAdminResident",
                        {},
                        "Superadmin kan bare opprette Admin eller Resident."
                    ),
                    "error"
                );


                return;

            }


            // ========================================================
            // DISABLE BUTTON
            // ========================================================

            if (
                createUserButton
            ) {

                createUserButton.disabled =
                    true;


                createUserButton.textContent =
                    t(
                        "adminCreatingUser",
                        {},
                        "Oppretter..."
                    );

            }


            showMessage(
                t(
                    "adminCreatingUserMessage",
                    {},
                    "Oppretter bruker..."
                ),
                "info"
            );


            try {


                // ====================================================
                // CREATE USER THROUGH EDGE FUNCTION
                // ====================================================

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


                // ====================================================
                // EDGE FUNCTION ERROR
                // ====================================================

                if (
                    error
                ) {

                    console.error(
                        "CREATE USER ERROR:",
                        error
                    );


                    let serverMessage =
                        "";


                    try {

                        const response =
                            error.context;


                        if (
                            response
                        ) {

                            const errorBody =
                                await response
                                    .json();


                            console.error(
                                "CREATE USER ERROR BODY:",
                                errorBody
                            );


                            serverMessage =
                                errorBody?.error ||
                                "";

                        }

                    }
                    catch (
                        bodyError
                        ) {

                        console.error(
                            "COULD NOT READ ERROR BODY:",
                            bodyError
                        );

                    }


                    showMessage(
                        serverMessage ||
                        error.message ||
                        t(
                            "adminCouldNotCreateUser",
                            {},
                            "Kunne ikke opprette bruker."
                        ),
                        "error"
                    );


                    return;

                }


                // ====================================================
                // FUNCTION RESPONSE ERROR
                // ====================================================

                if (
                    !data ||
                    data.success !==
                    true
                ) {

                    showMessage(
                        data?.error ||
                        t(
                            "adminCouldNotCreateUser",
                            {},
                            "Kunne ikke opprette bruker."
                        ),
                        "error"
                    );


                    return;

                }


                // ====================================================
                // SUCCESS
                // ====================================================

                showMessage(
                    t(
                        "adminUserCreatedPasswordLinkSent",
                        {},
                        "Brukeren ble opprettet. En sikker lenke for å sette passord er sendt til e-postadressen."
                    ),
                    "success"
                );


                // ====================================================
                // RESET FORM
                // ====================================================

                userForm.reset();


                // ====================================================
                // REBUILD ROLE OPTIONS
                // ====================================================

                configureRoleOptions(
                    currentProfile.role
                );


                // ====================================================
                // RELOAD USER LIST
                // ====================================================

                await loadUsers();

            }
            catch (
                error
                ) {

                console.error(
                    "CREATE USER EXCEPTION:",
                    error
                );


                showMessage(
                    t(
                        "adminCreateUserUnexpectedError",
                        {},
                        "Det oppstod en feil ved opprettelse av bruker."
                    ),
                    "error"
                );

            }
            finally {

                if (
                    createUserButton
                ) {

                    createUserButton.disabled =
                        false;


                    createUserButton.textContent =
                        "+ " +
                        t(
                            "adminCreateUser",
                            {},
                            "Opprett bruker"
                        );

                }

            }

        }
    );

}


// ============================================================
// RENDER USERS
// ============================================================

function renderUsers() {

    if (
        !userList
    ) {

        return;

    }


    if (
        !currentVisibleUsers ||
        currentVisibleUsers.length ===
        0
    ) {

        userList.innerHTML = `

            <p class="empty-state">
                ${t(
            "adminNoUsersRegistered",
            {},
            "Ingen brukere registrert."
        )}
            </p>

        `;


        if (
            userSearchEmpty
        ) {

            userSearchEmpty.hidden =
                true;

        }


        return;

    }


    userList.innerHTML =
        "";


    currentVisibleUsers.forEach(
        function (
            user
        ) {

            // ========================================================
            // VALUES
            // ========================================================

            const formattedRole =
                formatRole(
                    user.role
                );


            const statusText =
                user.is_active
                    ? t(
                        "active",
                        {},
                        "Aktiv"
                    )
                    : t(
                        "adminDeactivated",
                        {},
                        "Deaktivert"
                    );


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
                        getCurrentLocale()
                    );


            // ========================================================
            // ROW
            // ========================================================

            const row =
                document.createElement(
                    "div"
                );


            row.className =
                "resident-item admin-user-row";


            row.dataset.searchText =
                searchText;


            // ========================================================
            // CONTENT
            // ========================================================

            const content =
                document.createElement(
                    "div"
                );


            content.className =
                "admin-user-row-content";


            // ========================================================
            // NAME
            // ========================================================

            const name =
                document.createElement(
                    "h3"
                );


            name.textContent =
                "👤 " +
                (
                    user.full_name ||
                    t(
                        "adminUnknownUser",
                        {},
                        "Ukjent bruker"
                    )
                );


            // ========================================================
            // EMAIL
            // ========================================================

            const email =
                document.createElement(
                    "p"
                );


            email.className =
                "admin-user-email";


            email.textContent =
                user.email ||
                "";


            // ========================================================
            // META
            // ========================================================

            const meta =
                document.createElement(
                    "div"
                );


            meta.className =
                "admin-user-meta";


            // ========================================================
            // ROLE BADGE
            // ========================================================

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


            // ========================================================
            // CONTENT APPEND
            // ========================================================

            content.appendChild(
                name
            );


            content.appendChild(
                email
            );


            content.appendChild(
                meta
            );


            // ========================================================
            // ACTION / STATUS
            // ========================================================

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


            // ========================================================
            // ROW APPEND
            // ========================================================

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


    filterUserList();

}

// ============================================================
// CREATE USER
// ============================================================

if (
    userForm
) {

    userForm.addEventListener(
        "submit",
        async function (
            event
        ) {

            event.preventDefault();


            // ========================================================
            // CHECK CURRENT PROFILE
            // ========================================================

            if (
                !currentProfile
            ) {

                showMessage(
                    t(
                        "adminCouldNotVerifyUserRole",
                        {},
                        "Kunne ikke kontrollere brukerrollen."
                    ),
                    "error"
                );


                return;

            }


            // ========================================================
            // VALUES
            // ========================================================

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


            // ========================================================
            // BASIC VALIDATION
            // ========================================================

            if (
                !fullName ||
                !email ||
                !role
            ) {

                showMessage(
                    t(
                        "adminFillAllUserFields",
                        {},
                        "Fyll ut alle feltene."
                    ),
                    "error"
                );


                return;

            }


            // ========================================================
            // EMAIL VALIDATION
            // ========================================================

            const emailPattern =
                /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


            if (
                !emailPattern.test(
                    email
                )
            ) {

                showMessage(
                    t(
                        "adminEnterValidEmail",
                        {},
                        "Skriv inn en gyldig e-postadresse."
                    ),
                    "error"
                );


                return;

            }


            // ========================================================
            // FRONTEND ROLE SECURITY
            //
            // The Edge Function must also enforce these rules.
            // ========================================================

            if (
                currentProfile.role ===
                "admin" &&
                role !==
                "resident"
            ) {

                showMessage(
                    t(
                        "adminCanOnlyCreateResident",
                        {},
                        "Admin kan bare opprette Resident-brukere."
                    ),
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
                    t(
                        "superadminCanOnlyCreateAdminResident",
                        {},
                        "Superadmin kan bare opprette Admin eller Resident."
                    ),
                    "error"
                );


                return;

            }


            // ========================================================
            // DISABLE BUTTON
            // ========================================================

            if (
                createUserButton
            ) {

                createUserButton.disabled =
                    true;


                createUserButton.textContent =
                    t(
                        "adminCreatingUser",
                        {},
                        "Oppretter..."
                    );

            }


            showMessage(
                t(
                    "adminCreatingUserMessage",
                    {},
                    "Oppretter bruker..."
                ),
                "info"
            );


            try {


                // ====================================================
                // CREATE USER THROUGH EDGE FUNCTION
                // ====================================================

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


                // ====================================================
                // EDGE FUNCTION ERROR
                // ====================================================

                if (
                    error
                ) {

                    console.error(
                        "CREATE USER ERROR:",
                        error
                    );


                    let serverMessage =
                        "";


                    try {

                        const response =
                            error.context;


                        if (
                            response
                        ) {

                            const errorBody =
                                await response
                                    .json();


                            console.error(
                                "CREATE USER ERROR BODY:",
                                errorBody
                            );


                            serverMessage =
                                errorBody?.error ||
                                "";

                        }

                    }
                    catch (
                        bodyError
                        ) {

                        console.error(
                            "COULD NOT READ ERROR BODY:",
                            bodyError
                        );

                    }


                    showMessage(
                        serverMessage ||
                        error.message ||
                        t(
                            "adminCouldNotCreateUser",
                            {},
                            "Kunne ikke opprette bruker."
                        ),
                        "error"
                    );


                    return;

                }


                // ====================================================
                // FUNCTION RESPONSE ERROR
                // ====================================================

                if (
                    !data ||
                    data.success !==
                    true
                ) {

                    showMessage(
                        data?.error ||
                        t(
                            "adminCouldNotCreateUser",
                            {},
                            "Kunne ikke opprette bruker."
                        ),
                        "error"
                    );


                    return;

                }


                // ====================================================
                // SUCCESS
                // ====================================================

                showMessage(
                    t(
                        "adminUserCreatedPasswordLinkSent",
                        {},
                        "Brukeren ble opprettet. En sikker lenke for å sette passord er sendt til e-postadressen."
                    ),
                    "success"
                );


                // ====================================================
                // RESET FORM
                // ====================================================

                userForm.reset();


                // ====================================================
                // REBUILD ROLE OPTIONS
                // ====================================================

                configureRoleOptions(
                    currentProfile.role
                );


                // ====================================================
                // RELOAD USER LIST
                // ====================================================

                await loadUsers();

            }
            catch (
                error
                ) {

                console.error(
                    "CREATE USER EXCEPTION:",
                    error
                );


                showMessage(
                    t(
                        "adminCreateUserUnexpectedError",
                        {},
                        "Det oppstod en feil ved opprettelse av bruker."
                    ),
                    "error"
                );

            }
            finally {

                if (
                    createUserButton
                ) {

                    createUserButton.disabled =
                        false;


                    createUserButton.textContent =
                        "+ " +
                        t(
                            "adminCreateUser",
                            {},
                            "Opprett bruker"
                        );

                }

            }

        }
    );

}


// ============================================================
// RENDER USERS
// ============================================================

function renderUsers() {

    if (
        !userList
    ) {

        return;

    }


    if (
        !currentVisibleUsers ||
        currentVisibleUsers.length ===
        0
    ) {

        userList.innerHTML = `

            <p class="empty-state">
                ${t(
            "adminNoUsersRegistered",
            {},
            "Ingen brukere registrert."
        )}
            </p>

        `;


        if (
            userSearchEmpty
        ) {

            userSearchEmpty.hidden =
                true;

        }


        return;

    }


    userList.innerHTML =
        "";


    currentVisibleUsers.forEach(
        function (
            user
        ) {

            // ========================================================
            // VALUES
            // ========================================================

            const formattedRole =
                formatRole(
                    user.role
                );


            const statusText =
                user.is_active
                    ? t(
                        "active",
                        {},
                        "Aktiv"
                    )
                    : t(
                        "adminDeactivated",
                        {},
                        "Deaktivert"
                    );


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
                        getCurrentLocale()
                    );


            // ========================================================
            // ROW
            // ========================================================

            const row =
                document.createElement(
                    "div"
                );


            row.className =
                "resident-item admin-user-row";


            row.dataset.searchText =
                searchText;


            // ========================================================
            // CONTENT
            // ========================================================

            const content =
                document.createElement(
                    "div"
                );


            content.className =
                "admin-user-row-content";


            // ========================================================
            // NAME
            // ========================================================

            const name =
                document.createElement(
                    "h3"
                );


            name.textContent =
                "👤 " +
                (
                    user.full_name ||
                    t(
                        "adminUnknownUser",
                        {},
                        "Ukjent bruker"
                    )
                );


            // ========================================================
            // EMAIL
            // ========================================================

            const email =
                document.createElement(
                    "p"
                );


            email.className =
                "admin-user-email";


            email.textContent =
                user.email ||
                "";


            // ========================================================
            // META
            // ========================================================

            const meta =
                document.createElement(
                    "div"
                );


            meta.className =
                "admin-user-meta";


            // ========================================================
            // ROLE BADGE
            // ========================================================

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


            // ========================================================
            // CONTENT APPEND
            // ========================================================

            content.appendChild(
                name
            );


            content.appendChild(
                email
            );


            content.appendChild(
                meta
            );


            // ========================================================
            // ACTION / STATUS
            // ========================================================

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


            // ========================================================
            // ROW APPEND
            // ========================================================

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


    filterUserList();

}

// ============================================================
// LOAD USERS
// ============================================================

async function loadUsers() {

    if (
        !userList
    ) {

        return;

    }


    // ========================================================
    // CURRENT PROFILE MUST BE LOADED
    // ========================================================

    if (
        !currentProfile
    ) {

        currentVisibleUsers =
            [];


        visibleUserCount =
            0;


        updateUserListCounters();


        userList.innerHTML = `

            <p class="empty-state">
                ${t(
            "adminCouldNotVerifyUserRole",
            {},
            "Kunne ikke kontrollere brukerrollen."
        )}
            </p>

        `;


        return;

    }


    // ========================================================
    // LOADING STATE
    // ========================================================

    userList.innerHTML = `

        <p class="empty-state">
            ${t(
        "adminLoadingUsers",
        {},
        "Laster brukere..."
    )}
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
                    ascending:
                        true
                }
            );


    // ========================================================
    // DATABASE ERROR
    // ========================================================

    if (
        error
    ) {

        console.error(
            "LOAD USERS ERROR:",
            error
        );


        currentVisibleUsers =
            [];


        visibleUserCount =
            0;


        updateUserListCounters();


        userList.innerHTML = `

            <p class="empty-state">
                ${t(
            "adminCouldNotLoadUsers",
            {},
            "Kunne ikke laste brukere."
        )}
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
                function (
                    user
                ) {

                    return (
                        user.role !==
                        "superadmin"
                    );

                }
            );

    }


    currentVisibleUsers =
        visibleUsers;


    // ========================================================
    // COUNT
    // ========================================================

    visibleUserCount =
        currentVisibleUsers.length;


    updateUserListCounters();


    // ========================================================
    // RENDER
    // ========================================================

    renderUsers();

}


// ============================================================
// UPDATE USER LIST COUNTERS
// ============================================================

function updateUserListCounters() {

    if (
        userCountBadge
    ) {

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

    switch (
        role
        ) {

        case "superadmin":

            return t(
                "adminRoleSuperadmin",
                {},
                "Superadmin"
            );


        case "admin":

            return t(
                "adminRoleAdmin",
                {},
                "Admin"
            );


        case "resident":

            return t(
                "adminRoleResident",
                {},
                "Resident"
            );


        default:

            return (
                role ||
                t(
                    "adminUnknown",
                    {},
                    "Ukjent"
                )
            );

    }

}


// ============================================================
// REFRESH DYNAMIC LANGUAGE
// ============================================================

function refreshUsersLanguage() {

    // ========================================================
    // ROLE SELECT
    // ========================================================

    if (
        currentProfile
    ) {

        configureRoleOptions(
            currentProfile.role
        );

    }


    // ========================================================
    // TOGGLE BUTTON
    // ========================================================

    updateUsersToggleButton();


    // ========================================================
    // USER LIST
    //
    // Re-render cached data only.
    // No Supabase call.
    // ========================================================

    renderUsers();


    // ========================================================
    // SEARCH COUNT
    // ========================================================

    filterUserList();


    // ========================================================
    // CREATE BUTTON
    // ========================================================

    if (
        createUserButton &&
        !createUserButton.disabled
    ) {

        createUserButton.textContent =
            "+ " +
            t(
                "adminCreateUser",
                {},
                "Opprett bruker"
            );

    }

}


// ============================================================
// LANGUAGE CHANGE
// ============================================================

window.addEventListener(
    "cleanplan:languagechange",
    function () {

        refreshUsersLanguage();

    }
);


// ============================================================
// START
// ============================================================

async function start() {

    const profile =
        await loadCurrentUser();


    if (
        !profile
    ) {

        return;

    }


    // ========================================================
    // LIST CLOSED BY DEFAULT
    // ========================================================

    setUserListOpen(
        false
    );


    // ========================================================
    // LOAD USERS
    // ========================================================

    await loadUsers();


    // ========================================================
    // FINAL UI SYNC
    // ========================================================

    updateUsersToggleButton();


    filterUserList();

}


// ============================================================
// START PAGE
// ============================================================

start();
