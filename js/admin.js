
// ============================================================
// CLEANING APP
// ADMIN DASHBOARD
// ============================================================


// ============================================================
// ELEMENTS
// ============================================================

const logoutButton =
    document.getElementById("logoutButton");

const propertiesButton =
    document.getElementById("propertiesButton");

const residentsButton =
    document.getElementById("residentsButton");

const cleaningPlanButton =
    document.getElementById("cleaningPlanButton");

const usersCard =
    document.getElementById("usersCard");

const usersButton =
    document.getElementById("usersButton");


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
// LOAD ADMIN
// ============================================================

async function loadAdmin() {

    const {
        data: { session },
        error: sessionError
    } =
        await supabaseClient.auth.getSession();


    // --------------------------------------------------------
    // NO SESSION
    // --------------------------------------------------------

    if (
        sessionError ||
        !session
    ) {

        window.location.href =
            "index.html";

        return;

    }


    // ========================================================
    // LOAD PROFILE
    // ========================================================

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


    // --------------------------------------------------------
    // PROFILE ERROR
    // --------------------------------------------------------

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

        return;

    }


    // ========================================================
    // ADMIN ACCESS
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

        return;

    }


    // ========================================================
    // HEADER
    // ========================================================

    const welcomeTitle =
        document.getElementById(
            "welcomeTitle"
        );

    const adminName =
        document.getElementById(
            "adminName"
        );


    if (welcomeTitle) {

        welcomeTitle.textContent =
            "Velkommen, " +
            profile.full_name;

    }


    if (adminName) {

        adminName.textContent =
            profile.full_name;

    }


    // ========================================================
    // USER MANAGEMENT
    // ========================================================
    //
    // BOTH SUPERADMIN AND ADMIN CAN OPEN USERS.
    //
    // Superadmin:
    //     -> can create Admin
    //     -> can create Resident
    //
    // Admin:
    //     -> can create Resident
    //
    // Neither:
    //     -> can create Superadmin
    //
    // The actual permission must ALSO be enforced
    // by the Edge Function on the server.
    //
    // ========================================================

    if (usersCard) {

        usersCard.hidden =
            false;

    }

}


// ============================================================
// PROPERTIES NAVIGATION
// ============================================================

if (propertiesButton) {

    propertiesButton.addEventListener(
        "click",
        function () {

            window.location.href =
                "properties.html";

        }
    );

}


// ============================================================
// RESIDENTS NAVIGATION
// ============================================================

if (residentsButton) {

    residentsButton.addEventListener(
        "click",
        function () {

            window.location.href =
                "admin-residents.html";

        }
    );

}


// ============================================================
// CLEANING PLAN NAVIGATION
// ============================================================

if (cleaningPlanButton) {

    cleaningPlanButton.addEventListener(
        "click",
        function () {

            window.location.href =
                "admin-cleaning-plan.html";

        }
    );

}

// ============================================================
// USERS NAVIGATION
// ============================================================

if (usersButton) {

    usersButton.addEventListener(
        "click",
        function () {

            window.location.href =
                "users.html";

        }
    );

}


// ============================================================
// START
// ============================================================

loadAdmin();
