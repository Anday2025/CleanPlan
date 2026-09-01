// ============================================================
// CLEANING APP
// ADMIN DASHBOARD
// ============================================================


// ============================================================
// ELEMENTS
// ============================================================

const propertiesButton =
    document.getElementById(
        "propertiesButton"
    );

const residentsButton =
    document.getElementById(
        "residentsButton"
    );

const cleaningPlanButton =
    document.getElementById(
        "cleaningPlanButton"
    );

const usersCard =
    document.getElementById(
        "usersCard"
    );

const usersButton =
    document.getElementById(
        "usersButton"
    );


// ============================================================
// SIDEBAR ELEMENTS
// ============================================================

const dashboardSidebarButton =
    document.getElementById(
        "dashboardSidebarButton"
    );

const propertiesSidebarButton =
    document.getElementById(
        "propertiesSidebarButton"
    );

const floorsSidebarButton =
    document.getElementById(
        "floorsSidebarButton"
    );

const residentsSidebarButton =
    document.getElementById(
        "residentsSidebarButton"
    );

const cleaningPlanSidebarButton =
    document.getElementById(
        "cleaningPlanSidebarButton"
    );

const usersSidebarButton =
    document.getElementById(
        "usersSidebarButton"
    );

const historySidebarButton =
    document.getElementById(
        "historySidebarButton"
    );

const settingsSidebarButton =
    document.getElementById(
        "settingsSidebarButton"
    );

const sidebarLogoutButton =
    document.getElementById(
        "sidebarLogoutButton"
    );


// ============================================================
// MOBILE SIDEBAR
// ============================================================

const mobileSidebarButton =
    document.getElementById(
        "mobileSidebarButton"
    );

const adminSidebar =
    document.querySelector(
        ".admin-sidebar"
    );

const adminSidebarOverlay =
    document.getElementById(
        "adminSidebarOverlay"
    );


// ============================================================
// PROFILE ELEMENTS
// ============================================================

const welcomeTitle =
    document.getElementById(
        "welcomeTitle"
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

const dashboardRoleBadge =
    document.getElementById(
        "dashboardRoleBadge"
    );


// ============================================================
// DASHBOARD STATISTICS
// ============================================================

const dashboardPropertyCount =
    document.getElementById(
        "dashboardPropertyCount"
    );

const dashboardResidentCount =
    document.getElementById(
        "dashboardResidentCount"
    );

const dashboardUserCount =
    document.getElementById(
        "dashboardUserCount"
    );

const dashboardCleaningPlanCount =
    document.getElementById(
        "dashboardCleaningPlanCount"
    );


// ============================================================
// STATE
// ============================================================

let currentAdminProfile =
    null;


// ============================================================
// LOGOUT
// ============================================================

async function logoutAdmin() {

    await supabaseClient
        .auth
        .signOut();


    window.location.href =
        "index.html";

}


// ============================================================
// SIDEBAR LOGOUT
// ============================================================

if (sidebarLogoutButton) {

    sidebarLogoutButton.addEventListener(
        "click",
        logoutAdmin
    );

}


// ============================================================
// MOBILE SIDEBAR
// ============================================================

function openMobileSidebar() {

    if (adminSidebar) {

        adminSidebar.classList.add(
            "open"
        );

    }


    if (adminSidebarOverlay) {

        adminSidebarOverlay.classList.add(
            "visible"
        );

    }

}


// ============================================================
// CLOSE MOBILE SIDEBAR
// ============================================================

function closeMobileSidebar() {

    if (adminSidebar) {

        adminSidebar.classList.remove(
            "open"
        );

    }


    if (adminSidebarOverlay) {

        adminSidebarOverlay.classList.remove(
            "visible"
        );

    }

}


// ============================================================
// MOBILE MENU BUTTON
// ============================================================

if (mobileSidebarButton) {

    mobileSidebarButton.addEventListener(
        "click",
        openMobileSidebar
    );

}


// ============================================================
// MOBILE OVERLAY
// ============================================================

if (adminSidebarOverlay) {

    adminSidebarOverlay.addEventListener(
        "click",
        closeMobileSidebar
    );

}


// ============================================================
// FORMAT ROLE
// ============================================================

function formatAdminRole(
    role
) {

    if (
        role ===
        "superadmin"
    ) {

        return "Superadmin";

    }


    if (
        role ===
        "admin"
    ) {

        return "Admin";

    }


    return "Administrator";

}


// ============================================================
// UPDATE PROFILE UI
// ============================================================

function updateAdminProfileUi(
    profile
) {

    if (!profile) {

        return;

    }


    const displayName =
        profile.full_name ||
        "Administrator";


    const displayRole =
        formatAdminRole(
            profile.role
        );


    // --------------------------------------------------------
    // WELCOME
    // --------------------------------------------------------

    if (welcomeTitle) {

        welcomeTitle.textContent =
            "Velkommen, " +
            displayName;

    }


    // --------------------------------------------------------
    // TOP HEADER NAME
    // --------------------------------------------------------

    if (adminName) {

        adminName.textContent =
            displayName;

    }


    // --------------------------------------------------------
    // TOP HEADER ROLE
    // --------------------------------------------------------

    if (adminRole) {

        adminRole.textContent =
            displayRole;

    }


    // --------------------------------------------------------
    // DASHBOARD ROLE BADGE
    // --------------------------------------------------------

    if (dashboardRoleBadge) {

        dashboardRoleBadge.textContent =
            displayRole;


        dashboardRoleBadge.dataset.role =
            profile.role || "";

    }


    // --------------------------------------------------------
    // AVATAR INITIAL
    // --------------------------------------------------------

    if (adminInitial) {

        adminInitial.textContent =
            displayName
                .trim()
                .charAt(0)
                .toUpperCase();

    }

}


// ============================================================
// LOAD ADMIN
// ============================================================

async function loadAdmin() {

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
    // NO SESSION
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
    // LOAD PROFILE
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


        await logoutAdmin();


        return null;

    }


    // ========================================================
    // ADMIN ACCESS
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

        await logoutAdmin();


        return null;

    }


    currentAdminProfile =
        profile;


    // ========================================================
    // PROFILE UI
    // ========================================================

    updateAdminProfileUi(
        profile
    );


    // ========================================================
    // USER MANAGEMENT
    // ========================================================
    //
    // Both Admin and Superadmin can use the users page.
    //
    // Superadmin:
    //     -> can create Admin
    //     -> can create Resident
    //
    // Admin:
    //     -> can create Resident
    //
    // Actual permissions remain protected by RLS
    // and the Edge Function.
    //
    // ========================================================

    if (usersCard) {

        usersCard.hidden =
            false;

    }


    if (usersSidebarButton) {

        usersSidebarButton.hidden =
            false;

    }


    return profile;

}


// ============================================================
// SAFE COUNT
// ============================================================

function displayDashboardCount(
    element,
    value
) {

    if (!element) {

        return;

    }


    if (
        typeof value !==
        "number" ||
        Number.isNaN(
            value
        )
    ) {

        element.textContent =
            "–";


        return;

    }


    element.textContent =
        String(
            value
        );

}


// ============================================================
// LOAD PROPERTY COUNT
// ============================================================

async function loadDashboardPropertyCount() {

    const {
        count,
        error
    } =
        await supabaseClient
            .from(
                "properties"
            )
            .select(
                "id",
                {
                    count: "exact",
                    head: true
                }
            )
            .eq(
                "is_active",
                true
            );


    if (error) {

        console.error(
            "DASHBOARD PROPERTY COUNT ERROR:",
            error
        );


        displayDashboardCount(
            dashboardPropertyCount,
            null
        );


        return null;

    }


    displayDashboardCount(
        dashboardPropertyCount,
        count || 0
    );


    return count || 0;

}


// ============================================================
// LOAD RESIDENT COUNT
// ============================================================

async function loadDashboardResidentCount() {

    const {
        count,
        error
    } =
        await supabaseClient
            .from(
                "residents"
            )
            .select(
                "id",
                {
                    count: "exact",
                    head: true
                }
            )
            .eq(
                "is_active",
                true
            );


    if (error) {

        console.error(
            "DASHBOARD RESIDENT COUNT ERROR:",
            error
        );


        displayDashboardCount(
            dashboardResidentCount,
            null
        );


        return null;

    }


    displayDashboardCount(
        dashboardResidentCount,
        count || 0
    );


    return count || 0;

}


// ============================================================
// LOAD USER COUNT
// ============================================================

async function loadDashboardUserCount() {

    const {
        count,
        error
    } =
        await supabaseClient
            .from(
                "profiles"
            )
            .select(
                "id",
                {
                    count: "exact",
                    head: true
                }
            )
            .eq(
                "is_active",
                true
            );


    if (error) {

        console.error(
            "DASHBOARD USER COUNT ERROR:",
            error
        );


        displayDashboardCount(
            dashboardUserCount,
            null
        );


        return null;

    }


    displayDashboardCount(
        dashboardUserCount,
        count || 0
    );


    return count || 0;

}


// ============================================================
// LOAD CLEANING PLAN COUNT
// ============================================================

async function loadDashboardCleaningPlanCount() {

    const {
        count,
        error
    } =
        await supabaseClient
            .from(
                "cleaning_plans"
            )
            .select(
                "id",
                {
                    count: "exact",
                    head: true
                }
            )
            .eq(
                "is_active",
                true
            );


    if (error) {

        console.error(
            "DASHBOARD CLEANING PLAN COUNT ERROR:",
            error
        );


        displayDashboardCount(
            dashboardCleaningPlanCount,
            null
        );


        return null;

    }


    displayDashboardCount(
        dashboardCleaningPlanCount,
        count || 0
    );


    return count || 0;

}


// ============================================================
// LOAD DASHBOARD STATISTICS
// ============================================================

async function loadDashboardStatistics() {

    /*
     * Each query is protected by the table's existing RLS.
     *
     * Therefore:
     *
     * Superadmin sees counts from the rows Superadmin
     * is authorized to read.
     *
     * Admin sees counts only from rows Admin is
     * authorized to read.
     */


    await Promise.allSettled([

        loadDashboardPropertyCount(),

        loadDashboardResidentCount(),

        loadDashboardUserCount(),

        loadDashboardCleaningPlanCount()

    ]);

}


// ============================================================
// DASHBOARD NAVIGATION
// ============================================================

if (dashboardSidebarButton) {

    dashboardSidebarButton.addEventListener(
        "click",
        function () {

            window.location.href =
                "admin.html";

        }
    );

}


// ============================================================
// PROPERTIES NAVIGATION
// ============================================================

function openProperties() {

    window.location.href =
        "properties.html";

}


// ============================================================
// PROPERTIES MAIN BUTTON
// ============================================================

if (propertiesButton) {

    propertiesButton.addEventListener(
        "click",
        openProperties
    );

}


// ============================================================
// PROPERTIES SIDEBAR
// ============================================================

if (propertiesSidebarButton) {

    propertiesSidebarButton.addEventListener(
        "click",
        openProperties
    );

}


// ============================================================
// FLOORS NAVIGATION
// ============================================================
//
// Floors are currently managed through properties.html.
// Therefore Etasjer opens the same management page.
// ============================================================

if (floorsSidebarButton) {

    floorsSidebarButton.addEventListener(
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

function openResidents() {

    window.location.href =
        "admin-residents.html";

}


// ============================================================
// RESIDENTS MAIN BUTTON
// ============================================================

if (residentsButton) {

    residentsButton.addEventListener(
        "click",
        openResidents
    );

}


// ============================================================
// RESIDENTS SIDEBAR
// ============================================================

if (residentsSidebarButton) {

    residentsSidebarButton.addEventListener(
        "click",
        openResidents
    );

}


// ============================================================
// CLEANING PLAN NAVIGATION
// ============================================================

function openCleaningPlan() {

    window.location.href =
        "admin-cleaning-plan.html";

}


// ============================================================
// CLEANING PLAN MAIN BUTTON
// ============================================================

if (cleaningPlanButton) {

    cleaningPlanButton.addEventListener(
        "click",
        openCleaningPlan
    );

}


// ============================================================
// CLEANING PLAN SIDEBAR
// ============================================================

if (cleaningPlanSidebarButton) {

    cleaningPlanSidebarButton.addEventListener(
        "click",
        openCleaningPlan
    );

}


// ============================================================
// USERS NAVIGATION
// ============================================================

function openUsers() {

    window.location.href =
        "users.html";

}


// ============================================================
// USERS MAIN BUTTON
// ============================================================

if (usersButton) {

    usersButton.addEventListener(
        "click",
        openUsers
    );

}


// ============================================================
// USERS SIDEBAR
// ============================================================

if (usersSidebarButton) {

    usersSidebarButton.addEventListener(
        "click",
        openUsers
    );

}


// ============================================================
// HISTORY
// ============================================================

if (historySidebarButton) {

    historySidebarButton.addEventListener(
        "click",
        function () {

            /*
             * Do not navigate to a page that does not
             * exist yet.
             */

            window.alert(
                "Historikk kommer i et senere steg."
            );

        }
    );

}


// ============================================================
// SETTINGS
// ============================================================

if (settingsSidebarButton) {

    settingsSidebarButton.addEventListener(
        "click",
        function () {

            /*
             * Do not navigate to a page that does not
             * exist yet.
             */

            window.alert(
                "Innstillinger kommer i et senere steg."
            );

        }
    );

}


// ============================================================
// START
// ============================================================

async function initAdminDashboard() {

    // --------------------------------------------------------
    // AUTH + PROFILE FIRST
    // --------------------------------------------------------

    const profile =
        await loadAdmin();


    if (!profile) {

        return;

    }


    // --------------------------------------------------------
    // DASHBOARD DATA
    // --------------------------------------------------------

    await loadDashboardStatistics();

}


// ============================================================
// INITIALIZE
// ============================================================

initAdminDashboard();