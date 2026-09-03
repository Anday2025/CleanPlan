// ============================================================
// CLEANING APP
// RESIDENT DASHBOARD
// ============================================================


// ============================================================
// DOM ELEMENTS
// ============================================================

const logoutButton =
    document.getElementById(
        "logoutButton"
    );

const residentName =
    document.getElementById(
        "residentName"
    );

const welcomeTitle =
    document.getElementById(
        "welcomeTitle"
    );

const loadingSection =
    document.getElementById(
        "loadingSection"
    );

const waitingSection =
    document.getElementById(
        "waitingSection"
    );

const residentSection =
    document.getElementById(
        "residentSection"
    );

const cleaningSection =
    document.getElementById(
        "cleaningSection"
    );

const errorSection =
    document.getElementById(
        "errorSection"
    );

const residentPageMessage =
    document.getElementById(
        "residentPageMessage"
    );

const propertyName =
    document.getElementById(
        "propertyName"
    );

const propertyAddress =
    document.getElementById(
        "propertyAddress"
    );

const floorName =
    document.getElementById(
        "floorName"
    );

const cleaningPlanSubtitle =
    document.getElementById(
        "cleaningPlanSubtitle"
    );

const noCleaningPlanState =
    document.getElementById(
        "noCleaningPlanState"
    );

const cleaningPlanContent =
    document.getElementById(
        "cleaningPlanContent"
    );

const currentWeekHeading =
    document.getElementById(
        "currentWeekHeading"
    );

const currentWeekStatus =
    document.getElementById(
        "currentWeekStatus"
    );

const currentWeekDate =
    document.getElementById(
        "currentWeekDate"
    );

const currentWeekResponsible =
    document.getElementById(
        "currentWeekResponsible"
    );

const currentWeekFloor =
    document.getElementById(
        "currentWeekFloor"
    );

const previousWeekButton =
    document.getElementById(
        "previousWeekButton"
    );

const nextWeekButton =
    document.getElementById(
        "nextWeekButton"
    );

const selectedWeekNumber =
    document.getElementById(
        "selectedWeekNumber"
    );

const selectedWeekYear =
    document.getElementById(
        "selectedWeekYear"
    );

const weekPreviewList =
    document.getElementById(
        "weekPreviewList"
    );

const selectedWeekDate =
    document.getElementById(
        "selectedWeekDate"
    );

const selectedWeekResponsible =
    document.getElementById(
        "selectedWeekResponsible"
    );

const selectedWeekStatus =
    document.getElementById(
        "selectedWeekStatus"
    );

const cleaningTaskCount =
    document.getElementById(
        "cleaningTaskCount"
    );

const noCleaningTasksState =
    document.getElementById(
        "noCleaningTasksState"
    );

const cleaningTasksWrapper =
    document.getElementById(
        "cleaningTasksWrapper"
    );

const cleaningTaskList =
    document.getElementById(
        "cleaningTaskList"
    );

const taskPermissionMessage =
    document.getElementById(
        "taskPermissionMessage"
    );

const cleaningPermissionNotice =
    document.getElementById(
        "cleaningPermissionNotice"
    );

const cleaningPermissionText =
    document.getElementById(
        "cleaningPermissionText"
    );

const cameraButton =
    document.getElementById(
        "cameraButton"
    );

const photoPreviewGrid =
    document.getElementById(
        "photoPreviewGrid"
    );

const photoCount =
    document.getElementById(
        "photoCount"
    );

const signedByName =
    document.getElementById(
        "signedByName"
    );

const confirmWeekNumber =
    document.getElementById(
        "confirmWeekNumber"
    );

const confirmCleaningButton =
    document.getElementById(
        "confirmCleaningButton"
    );

const responsibleOnlyMessage =
    document.getElementById(
        "responsibleOnlyMessage"
    );

// ============================================================
// CLEANING HISTORY DOM ELEMENTS
// ============================================================

const cleaningHistoryButton =
    document.getElementById(
        "cleaningHistoryButton"
    );

const cleaningHistorySection =
    document.getElementById(
        "cleaningHistorySection"
    );

const closeCleaningHistoryButton =
    document.getElementById(
        "closeCleaningHistoryButton"
    );

const cleaningHistoryLoading =
    document.getElementById(
        "cleaningHistoryLoading"
    );

const cleaningHistoryEmpty =
    document.getElementById(
        "cleaningHistoryEmpty"
    );

const cleaningHistoryList =
    document.getElementById(
        "cleaningHistoryList"
    );


// ============================================================
// STATE
// ============================================================

let currentProfile =
    null;

let currentResident =
    null;

let currentCleaningPlan =
    null;

let currentCleaningTasks =
    [];

let currentCleaningMembers =
    [];

let currentWeekAssignments =
    {};

let currentCleaningCompletions =
    [];

let currentCleaningDocumentation =
    [];

let currentWeekFriday =
    null;

let selectedFriday =
    null;

let selectedResponsibleMember =
    null;

let isSavingDocumentation =
    false;

let isSavingTaskCompletion =
    false;

let isSigningCleaning =
    false;

let activeCameraStream =
    null;

let activeCameraOverlay =
    null;


// ============================================================
// CLEANING HISTORY STATE
// ============================================================

let currentCleaningHistory =
    [];

let isLoadingCleaningHistory =
    false;

let hasLoadedCleaningHistory =
    false;


// ============================================================
// CONSTANTS
// ============================================================

const MAX_PHOTOS =
    10;


// ============================================================
// TRANSLATION HELPERS
// ============================================================

function t(
    key,
    params
) {

    if (
        window.CleanPlanI18n &&
        typeof window.CleanPlanI18n.t ===
        "function"
    ) {

        return window.CleanPlanI18n.t(
            key,
            params
        );

    }


    /*
     * language.js should normally
     * always be loaded before resident.js.
     */

    return key;

}


// ============================================================
// GET CURRENT LANGUAGE
// ============================================================

function getCurrentLanguageCode() {

    if (
        window.CleanPlanI18n &&
        typeof window.CleanPlanI18n.getLanguage ===
        "function"
    ) {

        return window.CleanPlanI18n
            .getLanguage();

    }


    return (
        localStorage.getItem(
            "cleaningAppLanguage"
        ) ||
        "no"
    );

}


// ============================================================
// GET DATE LOCALE
// ============================================================

function getCurrentDateLocale() {

    const languageCode =
        getCurrentLanguageCode();


    if (
        languageCode ===
        "en"
    ) {

        return "en-GB";

    }


    return "nb-NO";

}


// ============================================================
// SHOW ERROR
// ============================================================

function showError(
    message
) {

    if (loadingSection) {

        loadingSection.hidden =
            true;

    }


    if (waitingSection) {

        waitingSection.hidden =
            true;

    }


    if (residentSection) {

        residentSection.hidden =
            true;

    }


    if (cleaningSection) {

        cleaningSection.hidden =
            true;

    }


    if (errorSection) {

        errorSection.hidden =
            false;

    }


    if (residentPageMessage) {

        residentPageMessage.textContent =
            message;

    }

}


// ============================================================
// HIDE CONTENT SECTIONS
// ============================================================

function hideContentSections() {

    if (waitingSection) {

        waitingSection.hidden =
            true;

    }


    if (residentSection) {

        residentSection.hidden =
            true;

    }


    if (cleaningSection) {

        cleaningSection.hidden =
            true;

    }


    if (errorSection) {

        errorSection.hidden =
            true;

    }

}


// ============================================================
// GET FLOOR DISPLAY NAME
// ============================================================

function getFloorDisplayName(
    floor
) {

    if (!floor) {

        return t(
            "notRegistered"
        );

    }


    if (floor.name) {

        return floor.name;

    }


    if (
        floor.floor_number !==
        null &&
        floor.floor_number !==
        undefined
    ) {

        return t(
            "floorNumber",
            {
                floor:
                floor.floor_number
            }
        );

    }


    return t(
        "notRegistered"
    );

}


// ============================================================
// NORMALIZE DATE
// ============================================================

function normalizeDate(
    value
) {

    if (!value) {

        return null;

    }


    if (
        value instanceof Date
    ) {

        return new Date(
            value.getFullYear(),
            value.getMonth(),
            value.getDate()
        );

    }


    const parts =
        String(
            value
        ).split(
            "-"
        );


    if (
        parts.length ===
        3
    ) {

        return new Date(
            Number(
                parts[0]
            ),
            Number(
                parts[1]
            ) - 1,
            Number(
                parts[2]
            )
        );

    }


    const parsed =
        new Date(
            value
        );


    if (
        Number.isNaN(
            parsed.getTime()
        )
    ) {

        return null;

    }


    return new Date(
        parsed.getFullYear(),
        parsed.getMonth(),
        parsed.getDate()
    );

}


// ============================================================
// FORMAT DATE
// ============================================================

function formatDisplayDate(
    date
) {

    if (!date) {

        return "-";

    }


    return new Intl.DateTimeFormat(
        getCurrentDateLocale(),
        {
            weekday:
                "long",

            day:
                "2-digit",

            month:
                "2-digit",

            year:
                "numeric"
        }
    ).format(
        date
    );

}


// ============================================================
// FORMAT SHORT DATE
// ============================================================

function formatShortDate(
    date
) {

    if (!date) {

        return "-";

    }


    return new Intl.DateTimeFormat(
        getCurrentDateLocale(),
        {
            day:
                "2-digit",

            month:
                "2-digit",

            year:
                "numeric"
        }
    ).format(
        date
    );

}


// ============================================================
// DATE TO ISO
// ============================================================

function dateToIso(
    date
) {

    if (!date) {

        return null;

    }


    const year =
        date.getFullYear();


    const month =
        String(
            date.getMonth() +
            1
        ).padStart(
            2,
            "0"
        );


    const day =
        String(
            date.getDate()
        ).padStart(
            2,
            "0"
        );


    return (
        year +
        "-" +
        month +
        "-" +
        day
    );

}


// ============================================================
// ADD DAYS
// ============================================================

function addDays(
    date,
    days
) {

    const result =
        new Date(
            date.getFullYear(),
            date.getMonth(),
            date.getDate()
        );


    result.setDate(
        result.getDate() +
        days
    );


    return result;

}


// ============================================================
// GET FRIDAY FOR DATE
// ============================================================

function getFridayForDate(
    date
) {

    const result =
        new Date(
            date.getFullYear(),
            date.getMonth(),
            date.getDate()
        );


    const day =
        result.getDay();


    let difference =
        5 -
        day;


    if (
        day ===
        0
    ) {

        difference =
            -2;

    }
    else if (
        day ===
        6
    ) {

        difference =
            -1;

    }


    result.setDate(
        result.getDate() +
        difference
    );


    return result;

}


// ============================================================
// GET ISO WEEK INFORMATION
// ============================================================

function getIsoWeekInfo(
    date
) {

    const target =
        new Date(
            Date.UTC(
                date.getFullYear(),
                date.getMonth(),
                date.getDate()
            )
        );


    const dayNumber =
        target.getUTCDay() ||
        7;


    target.setUTCDate(
        target.getUTCDate() +
        4 -
        dayNumber
    );


    const yearStart =
        new Date(
            Date.UTC(
                target.getUTCFullYear(),
                0,
                1
            )
        );


    const week =
        Math.ceil(
            (
                (
                    target -
                    yearStart
                ) /
                86400000 +
                1
            ) /
            7
        );


    return {

        week:
        week,

        year:
            target.getUTCFullYear()

    };

}


// ============================================================
// SAME DATE
// ============================================================

function isSameDate(
    firstDate,
    secondDate
) {

    if (
        !firstDate ||
        !secondDate
    ) {

        return false;

    }


    return (
        firstDate.getFullYear() ===
        secondDate.getFullYear() &&

        firstDate.getMonth() ===
        secondDate.getMonth() &&

        firstDate.getDate() ===
        secondDate.getDate()
    );

}


// ============================================================
// START OF DAY
// ============================================================

function startOfDay(
    date
) {

    return new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate()
    );

}


// ============================================================
// CURRENT WEEK FRIDAY
// ============================================================

function getCurrentWeekFriday() {

    return getFridayForDate(
        new Date()
    );

}


// ============================================================
// IS CURRENT SELECTED WEEK
// ============================================================

function isSelectedCurrentWeek() {

    if (
        !selectedFriday ||
        !currentWeekFriday
    ) {

        return false;

    }


    return isSameDate(
        selectedFriday,
        currentWeekFriday
    );

}


// ============================================================
// GET CLEANING WINDOW STATE
// ============================================================

function getCleaningWindowState() {

    const today =
        startOfDay(
            new Date()
        );


    const currentFriday =
        getCurrentWeekFriday();


    if (
        !selectedFriday ||
        !isSameDate(
            selectedFriday,
            currentFriday
        )
    ) {

        return "not-current-week";

    }


    const day =
        today.getDay();


    /*
     * Monday-Wednesday:
     * cleaning is not available yet.
     */

    if (
        day >=
        1 &&
        day <=
        3
    ) {

        return "not-open-yet";

    }


    /*
     * Thursday-Friday:
     * cleaning is open.
     */

    if (
        day ===
        4 ||
        day ===
        5
    ) {

        return "open";

    }


    /*
     * Saturday-Sunday:
     * deadline has passed.
     */

    return "deadline-passed";

}

// ============================================================
// AUTHENTICATION / SESSION
// ============================================================

async function loadSession() {

    const {
        data,
        error
    } =
        await supabaseClient.auth
            .getSession();


    if (
        error ||
        !data ||
        !data.session
    ) {

        window.location.href =
            "index.html";

        return null;

    }


    return data.session;

}


// ============================================================
// LOAD PROFILE
// ============================================================

async function loadProfile(
    userId
) {

    const {
        data,
        error
    } =
        await supabaseClient
            .from(
                "profiles"
            )
            .select(
                `
                id,
                full_name,
                email,
                role,
                is_active
                `
            )
            .eq(
                "id",
                userId
            )
            .single();


    if (
        error ||
        !data
    ) {

        console.error(
            "RESIDENT PROFILE ERROR:",
            error
        );

        return null;

    }


    return data;

}


// ============================================================
// CHECK RESIDENT ACCESS
// ============================================================

async function checkResidentAccess() {

    const session =
        await loadSession();


    if (!session) {

        return null;

    }


    const profile =
        await loadProfile(
            session.user.id
        );


    if (!profile) {

        await supabaseClient.auth
            .signOut();


        window.location.href =
            "index.html";

        return null;

    }


    if (!profile.is_active) {

        await supabaseClient.auth
            .signOut();


        window.location.href =
            "index.html";

        return null;

    }


    if (
        profile.role !==
        "resident"
    ) {

        if (
            profile.role ===
            "admin" ||
            profile.role ===
            "superadmin"
        ) {

            window.location.href =
                "admin.html";

            return null;

        }


        await supabaseClient.auth
            .signOut();


        window.location.href =
            "index.html";

        return null;

    }


    currentProfile =
        profile;


    if (residentName) {

        residentName.textContent =
            profile.full_name;

    }


    if (welcomeTitle) {

        welcomeTitle.textContent =
            t(
                "welcomeUser",
                {
                    name:
                    profile.full_name
                }
            );

    }


    return {

        session:
        session,

        profile:
        profile

    };

}


// ============================================================
// LOGOUT
// ============================================================

if (logoutButton) {

    logoutButton.addEventListener(
        "click",
        async function () {

            stopDirectCamera();


            await supabaseClient.auth
                .signOut();


            window.location.href =
                "index.html";

        }
    );

}


// ============================================================
// LOAD RESIDENT ASSOCIATION
// ============================================================

async function loadResidentAssociation(
    profileId
) {

    const {
        data,
        error
    } =
        await supabaseClient
            .from(
                "residents"
            )
            .select(
                `
                id,
                profile_id,
                property_id,
                floor_id,
                is_active,
                created_at,

                properties (
                    id,
                    name,
                    address
                ),

                floors (
                    id,
                    floor_number,
                    name
                )
                `
            )
            .eq(
                "profile_id",
                profileId
            )
            .eq(
                "is_active",
                true
            )
            .maybeSingle();


    if (error) {

        console.error(
            "LOAD RESIDENT ASSOCIATION ERROR:",
            error
        );


        showError(
            t(
                "couldNotFetchPropertyAssociation"
            )
        );


        return {

            success:
                false,

            resident:
                null

        };

    }


    if (!data) {

        currentResident =
            null;


        if (loadingSection) {

            loadingSection.hidden =
                true;

        }


        hideContentSections();


        if (waitingSection) {

            waitingSection.hidden =
                false;

        }


        return {

            success:
                true,

            resident:
                null

        };

    }


    currentResident =
        data;


    showResidentDashboard(
        data
    );


    return {

        success:
            true,

        resident:
        data

    };

}


// ============================================================
// SHOW RESIDENT DASHBOARD
// ============================================================

function showResidentDashboard(
    resident
) {

    if (loadingSection) {

        loadingSection.hidden =
            true;

    }


    hideContentSections();


    const property =
        resident.properties;

    const floor =
        resident.floors;


    if (propertyName) {

        propertyName.textContent =
            property?.name ||
            t(
                "propertyFallbackName"
            );

    }


    if (propertyAddress) {

        propertyAddress.textContent =
            property?.address ||
            t(
                "noAddressRegistered"
            );

    }


    if (floorName) {

        floorName.textContent =
            t(
                "floorPrefix",
                {
                    floor:
                        getFloorDisplayName(
                            floor
                        )
                }
            );

    }


    if (currentWeekFloor) {

        currentWeekFloor.textContent =
            getFloorDisplayName(
                floor
            );

    }


    if (residentSection) {

        residentSection.hidden =
            false;

    }


    if (cleaningSection) {

        cleaningSection.hidden =
            false;

    }

}


// ============================================================
// RESET CLEANING PLAN DISPLAY
// ============================================================

function resetCleaningPlanDisplay() {

    stopDirectCamera();


    currentCleaningPlan =
        null;

    currentCleaningTasks =
        [];

    currentCleaningMembers =
        [];

    currentWeekAssignments =
        {};

    currentCleaningCompletions =
        [];

    currentCleaningDocumentation =
        [];

    resetCleaningHistory();

    closeCleaningHistory();

    selectedResponsibleMember =
        null;

    currentWeekFriday =
        null;

    selectedFriday =
        null;


    if (noCleaningPlanState) {

        noCleaningPlanState.hidden =
            true;

    }


    if (cleaningPlanContent) {

        cleaningPlanContent.hidden =
            true;

    }


    if (cleaningTaskList) {

        cleaningTaskList.innerHTML =
            "";

    }


    if (weekPreviewList) {

        weekPreviewList.innerHTML =
            "";

    }


    renderPhotoPreviews();

}


// ============================================================
// LOAD CLEANING PLAN
// ============================================================

async function loadCleaningPlan() {

    resetCleaningPlanDisplay();


    if (!currentResident) {

        return;

    }


    if (
        !currentResident.property_id ||
        !currentResident.floor_id
    ) {

        if (noCleaningPlanState) {

            noCleaningPlanState.hidden =
                false;

        }


        if (cleaningPlanSubtitle) {

            cleaningPlanSubtitle.textContent =
                t(
                    "noActiveCleaningPlan"
                );

        }


        return;

    }


    const {
        data,
        error
    } =
        await supabaseClient
            .from(
                "cleaning_plans"
            )
            .select(
                `
                id,
                property_id,
                floor_id,
                name,
                start_date,
                is_active
                `
            )
            .eq(
                "property_id",
                currentResident.property_id
            )
            .eq(
                "floor_id",
                currentResident.floor_id
            )
            .eq(
                "is_active",
                true
            )
            .maybeSingle();


    if (error) {

        console.error(
            "LOAD CLEANING PLAN ERROR:",
            error
        );


        showError(
            t(
                "couldNotFetchCleaningPlan"
            )
        );


        return;

    }


    if (!data) {

        if (noCleaningPlanState) {

            noCleaningPlanState.hidden =
                false;

        }


        if (cleaningPlanSubtitle) {

            cleaningPlanSubtitle.textContent =
                t(
                    "noActiveCleaningPlan"
                );

        }


        return;

    }


    currentCleaningPlan =
        data;


    if (noCleaningPlanState) {

        noCleaningPlanState.hidden =
            true;

    }


    if (cleaningPlanContent) {

        cleaningPlanContent.hidden =
            false;

    }


    if (cleaningPlanSubtitle) {

        cleaningPlanSubtitle.textContent =
            (
                currentResident
                    .properties
                    ?.name ||
                t(
                    "propertyFallbackName"
                )
            ) +
            " • " +
            getFloorDisplayName(
                currentResident
                    .floors
            );

    }


    await loadCleaningTasks();

    await loadCleaningMembers();

    await loadWeekAssignments();


    currentWeekFriday =
        getCurrentWeekFriday();


    selectedFriday =
        new Date(
            currentWeekFriday
                .getFullYear(),

            currentWeekFriday
                .getMonth(),

            currentWeekFriday
                .getDate()
        );


    await renderCleaningSchedule();

}


// ============================================================
// LOAD CLEANING TASKS
// ============================================================

async function loadCleaningTasks() {

    currentCleaningTasks =
        [];


    if (!currentCleaningPlan) {

        return;

    }


    const {
        data,
        error
    } =
        await supabaseClient
            .from(
                "cleaning_plan_items"
            )
            .select(
                `
            id,
            plan_id,
            task_id,
            sort_order,

            cleaning_tasks (
                id,
                property_id,
                floor_id,
                name,
                description,
                sort_order,
                is_active,

                cleaning_task_translations (
                    language_code,
                    name,
                    description
                )
            )
            `
            )
            .eq(
                "plan_id",
                currentCleaningPlan.id
            )
            .order(
                "sort_order",
                {
                    ascending:
                        true
                }
            );

    if (error) {

        console.error(
            "LOAD CLEANING TASKS ERROR:",
            error
        );


        showError(
            t(
                "couldNotFetchCleaningTasks"
            )
        );


        return;

    }


    currentCleaningTasks =
        (
            data ||
            []
        ).filter(
            function (item) {

                return Boolean(
                    item.cleaning_tasks &&
                    item.cleaning_tasks
                        .is_active
                );

            }
        );

}


// ============================================================
// LOAD CLEANING MEMBERS
// ============================================================

async function loadCleaningMembers() {

    currentCleaningMembers =
        [];


    if (!currentCleaningPlan) {

        return;

    }


    const {
        data,
        error
    } =
        await supabaseClient
            .from(
                "cleaning_plan_members"
            )
            .select(
                `
                id,
                plan_id,
                resident_id,
                rotation_order,

                residents (
                    id,
                    profile_id,
                    property_id,
                    floor_id,
                    is_active,

                    profiles (
                        id,
                        full_name
                    )
                )
                `
            )
            .eq(
                "plan_id",
                currentCleaningPlan.id
            )
            .order(
                "rotation_order",
                {
                    ascending:
                        true
                }
            );


    if (error) {

        console.error(
            "LOAD CLEANING PLAN MEMBERS ERROR:",
            error
        );


        showError(
            t(
                "couldNotFetchCleaningRotation"
            )
        );


        return;

    }


    currentCleaningMembers =
        (
            data ||
            []
        ).filter(
            function (member) {

                return Boolean(
                    member.residents &&
                    member.residents
                        .is_active
                );

            }
        );

}

// ============================================================
// LOAD WEEK ASSIGNMENTS
// ============================================================

async function loadWeekAssignments() {

    currentWeekAssignments =
        {};


    if (!currentCleaningPlan) {

        return;

    }


    const {
        data,
        error
    } =
        await supabaseClient
            .from(
                "cleaning_week_assignments"
            )
            .select(
                `
                id,
                plan_id,
                week_start,
                resident_id,
                status,
                signed_by,
                signed_at,

                residents (
                    id,
                    profile_id,
                    property_id,
                    floor_id,
                    is_active,

                    profiles (
                        id,
                        full_name
                    )
                )
                `
            )
            .eq(
                "plan_id",
                currentCleaningPlan.id
            )
            .order(
                "week_start",
                {
                    ascending:
                        true
                }
            );


    if (error) {

        console.error(
            "LOAD WEEK ASSIGNMENTS ERROR:",
            error
        );

        return;

    }


    (
        data ||
        []
    ).forEach(
        function (assignment) {

            if (!assignment.week_start) {

                return;

            }


            currentWeekAssignments[
                assignment.week_start
                ] =
                assignment;

        }
    );

}


// ============================================================
// GET STORED ASSIGNMENT FOR FRIDAY
// ============================================================

function getStoredAssignmentForFriday(
    friday
) {

    if (!friday) {

        return null;

    }


    const fridayIso =
        dateToIso(
            friday
        );


    return (
        currentWeekAssignments[
            fridayIso
            ] ||
        null
    );

}


// ============================================================
// ENSURE WEEK ASSIGNMENT
// ============================================================

async function ensureWeekAssignment(
    friday
) {

    if (
        !currentCleaningPlan ||
        !friday
    ) {

        return null;

    }


    const fridayIso =
        dateToIso(
            friday
        );


    const existingAssignment =
        currentWeekAssignments[
            fridayIso
            ];


    if (existingAssignment) {

        return existingAssignment;

    }


    const {
        data,
        error
    } =
        await supabaseClient
            .rpc(
                "get_or_create_cleaning_week_assignment",
                {
                    p_plan_id:
                    currentCleaningPlan.id,

                    p_week_start:
                    fridayIso
                }
            );


    if (error) {

        console.error(
            "ENSURE WEEK ASSIGNMENT ERROR:",
            error
        );

        return null;

    }


    /*
     * The RPC may return the created assignment
     * directly, but reload from the database so
     * the local state always has the same shape,
     * including resident/profile and signing data.
     */

    await loadWeekAssignments();


    return (
        getStoredAssignmentForFriday(
            friday
        ) ||
        data ||
        null
    );

}


// ============================================================
// GET ROTATION MEMBER FOR FRIDAY
// ============================================================

function getRotationMemberForFriday(
    friday
) {

    if (
        !currentCleaningPlan ||
        !friday ||
        currentCleaningMembers.length ===
        0
    ) {

        return null;

    }


    /*
     * Prefer the stored database assignment.
     * This makes the database the authoritative
     * source after an assignment has been created.
     */

    const storedAssignment =
        getStoredAssignmentForFriday(
            friday
        );


    if (
        storedAssignment &&
        storedAssignment.resident_id
    ) {

        const storedMember =
            currentCleaningMembers.find(
                function (member) {

                    return (
                        member.resident_id ===
                        storedAssignment.resident_id
                    );

                }
            );


        if (storedMember) {

            return storedMember;

        }


        /*
         * If a former/inactive member still owns a
         * historical assignment, preserve the
         * assignment information when possible.
         */

        if (
            storedAssignment.residents
        ) {

            return {

                resident_id:
                storedAssignment.resident_id,

                residents:
                storedAssignment.residents

            };

        }

    }


    const planStart =
        normalizeDate(
            currentCleaningPlan.start_date
        );


    if (!planStart) {

        return null;

    }


    const planStartFriday =
        getFridayForDate(
            planStart
        );


    const millisecondsPerWeek =
        7 *
        24 *
        60 *
        60 *
        1000;


    const difference =
        startOfDay(
            friday
        ).getTime() -
        startOfDay(
            planStartFriday
        ).getTime();


    const weekOffset =
        Math.round(
            difference /
            millisecondsPerWeek
        );


    /*
     * Make modulo work for weeks before
     * the cleaning plan's start date too.
     */

    const memberCount =
        currentCleaningMembers.length;


    const memberIndex =
        (
            (
                weekOffset %
                memberCount
            ) +
            memberCount
        ) %
        memberCount;


    return (
        currentCleaningMembers[
            memberIndex
            ] ||
        null
    );

}


// ============================================================
// GET MEMBER DISPLAY NAME
// ============================================================

function getMemberDisplayName(
    member
) {

    if (!member) {

        return t(
            "notAssigned"
        );

    }


    return (
        member
            .residents
            ?.profiles
            ?.full_name ||
        t(
            "notAssigned"
        )
    );

}


// ============================================================
// GET ASSIGNMENT DISPLAY NAME
// ============================================================

function getAssignmentDisplayName(
    assignment
) {

    if (!assignment) {

        return t(
            "notAssigned"
        );

    }


    return (
        assignment
            .residents
            ?.profiles
            ?.full_name ||
        t(
            "notAssigned"
        )
    );

}


// ============================================================
// GET RESPONSIBLE MEMBER FOR FRIDAY
// ============================================================

function getResponsibleMemberForFriday(
    friday
) {

    if (!friday) {

        return null;

    }


    const assignment =
        getStoredAssignmentForFriday(
            friday
        );


    if (
        assignment &&
        assignment.resident_id
    ) {

        const matchingMember =
            currentCleaningMembers.find(
                function (member) {

                    return (
                        member.resident_id ===
                        assignment.resident_id
                    );

                }
            );


        if (matchingMember) {

            return matchingMember;

        }


        if (assignment.residents) {

            return {

                resident_id:
                assignment.resident_id,

                residents:
                assignment.residents

            };

        }

    }


    return getRotationMemberForFriday(
        friday
    );

}


// ============================================================
// IS CURRENT RESIDENT RESPONSIBLE
// ============================================================

function isCurrentResidentResponsible(
    friday
) {

    if (
        !currentResident ||
        !friday
    ) {

        return false;

    }


    const assignment =
        getStoredAssignmentForFriday(
            friday
        );


    if (assignment) {

        return (
            assignment.resident_id ===
            currentResident.id
        );

    }


    const responsibleMember =
        getResponsibleMemberForFriday(
            friday
        );


    if (!responsibleMember) {

        return false;

    }


    return (
        responsibleMember.resident_id ===
        currentResident.id
    );

}


// ============================================================
// CAN CURRENT USER COMPLETE
// ============================================================

function canCurrentUserComplete() {

    if (
        !currentResident ||
        !currentCleaningPlan ||
        !selectedFriday
    ) {

        return false;

    }


    if (
        !isCurrentResidentResponsible(
            selectedFriday
        )
    ) {

        return false;

    }


    if (
        !isSelectedCurrentWeek()
    ) {

        return false;

    }


    return (
        getCleaningWindowState() ===
        "open"
    );

}


// ============================================================
// GET ASSIGNMENT STATUS KEY
// ============================================================

function getAssignmentStatusKey(
    assignment,
    friday
) {

    if (
        assignment &&
        (
            assignment.signed_by ||
            assignment.signed_at ||
            assignment.status ===
            "completed"
        )
    ) {

        return "completed";

    }


    if (!friday) {

        return "planned";

    }


    const today =
        startOfDay(
            new Date()
        );


    const fridayDate =
        startOfDay(
            friday
        );


    /*
     * A future cleaning week.
     */

    if (
        fridayDate.getTime() >
        getCurrentWeekFriday()
            .getTime()
    ) {

        return "planned";

    }


    /*
     * Current cleaning week.
     */

    if (
        isSameDate(
            friday,
            getCurrentWeekFriday()
        )
    ) {

        const windowState =
            getCleaningWindowState();


        if (
            windowState ===
            "not-open-yet"
        ) {

            return "not-open-yet";

        }


        if (
            windowState ===
            "open"
        ) {

            return "planned";

        }


        return "deadline-passed";

    }


    /*
     * Historical unsigned assignment.
     */

    if (
        fridayDate.getTime() <
        today.getTime()
    ) {

        return "not-completed";

    }


    return "planned";

}


// ============================================================
// GET STATUS TEXT
// ============================================================

function getAssignmentStatusText(
    assignment,
    friday
) {

    const statusKey =
        getAssignmentStatusKey(
            assignment,
            friday
        );


    switch (
        statusKey
        ) {

        case "completed":

            return t(
                "completed"
            );


        case "not-open-yet":

            return t(
                "notYetAvailable"
            );


        case "deadline-passed":

            return t(
                "deadlinePassed"
            );


        case "not-completed":

            return t(
                "notCompleted"
            );


        default:

            return t(
                "planned"
            );

    }

}


// ============================================================
// GET STATUS CSS CLASS
// ============================================================

function getAssignmentStatusClass(
    assignment,
    friday
) {

    const statusKey =
        getAssignmentStatusKey(
            assignment,
            friday
        );


    switch (
        statusKey
        ) {

        case "completed":

            return "completed";


        case "deadline-passed":

        case "not-completed":

            return "expired";


        case "not-open-yet":

            return "waiting";


        default:

            return "planned";

    }

}


// ============================================================
// GET SELECTED WEEK ASSIGNMENT
// ============================================================

function getSelectedWeekAssignment() {

    if (!selectedFriday) {

        return null;

    }


    return getStoredAssignmentForFriday(
        selectedFriday
    );

}


// ============================================================
// IS SELECTED WEEK SIGNED
// ============================================================

function isSelectedWeekSigned() {

    const assignment =
        getSelectedWeekAssignment();


    if (!assignment) {

        return false;

    }


    return Boolean(
        assignment.signed_by ||
        assignment.signed_at ||
        assignment.status ===
        "completed"
    );

}

// ============================================================
// RENDER CURRENT WEEK CARD
// ============================================================

function renderCurrentWeekCard() {

    if (
        !currentWeekFriday ||
        !currentCleaningPlan
    ) {

        return;

    }


    const assignment =
        getStoredAssignmentForFriday(
            currentWeekFriday
        );


    const responsibleMember =
        getResponsibleMemberForFriday(
            currentWeekFriday
        );


    const responsibleName =
        assignment
            ? getAssignmentDisplayName(
                assignment
            )
            : getMemberDisplayName(
                responsibleMember
            );


    const weekInfo =
        getIsoWeekInfo(
            currentWeekFriday
        );


    if (currentWeekHeading) {

        currentWeekHeading.textContent =
            t(
                "cleaningWeekHeading",
                {
                    week:
                    weekInfo.week
                }
            );

    }


    if (currentWeekStatus) {

        currentWeekStatus.textContent =
            getAssignmentStatusText(
                assignment,
                currentWeekFriday
            );


        currentWeekStatus.classList.remove(
            "planned",
            "waiting",
            "expired",
            "completed"
        );


        currentWeekStatus.classList.add(
            getAssignmentStatusClass(
                assignment,
                currentWeekFriday
            )
        );

    }


    if (currentWeekDate) {

        currentWeekDate.textContent =
            formatDisplayDate(
                currentWeekFriday
            );

    }


    if (currentWeekResponsible) {

        currentWeekResponsible.textContent =
            responsibleName;

    }


    if (currentWeekFloor) {

        currentWeekFloor.textContent =
            getFloorDisplayName(
                currentResident
                    ?.floors
            );

    }

}


// ============================================================
// RENDER SELECTED WEEK
// ============================================================

function renderSelectedWeek() {

    if (
        !selectedFriday ||
        !currentCleaningPlan
    ) {

        return;

    }


    const assignment =
        getStoredAssignmentForFriday(
            selectedFriday
        );


    selectedResponsibleMember =
        getResponsibleMemberForFriday(
            selectedFriday
        );


    const responsibleName =
        assignment
            ? getAssignmentDisplayName(
                assignment
            )
            : getMemberDisplayName(
                selectedResponsibleMember
            );


    const weekInfo =
        getIsoWeekInfo(
            selectedFriday
        );


    if (selectedWeekNumber) {

        selectedWeekNumber.textContent =
            t(
                "weekLabel",
                {
                    week:
                    weekInfo.week
                }
            );

    }


    if (selectedWeekYear) {

        selectedWeekYear.textContent =
            String(
                weekInfo.year
            );

    }


    if (selectedWeekDate) {

        selectedWeekDate.textContent =
            formatDisplayDate(
                selectedFriday
            );

    }


    if (selectedWeekResponsible) {

        selectedWeekResponsible.textContent =
            responsibleName;

    }


    if (selectedWeekStatus) {

        selectedWeekStatus.textContent =
            getAssignmentStatusText(
                assignment,
                selectedFriday
            );

    }


    if (signedByName) {

        if (
            assignment &&
            (
                assignment.signed_by ||
                assignment.signed_at ||
                assignment.status ===
                "completed"
            )
        ) {

            signedByName.textContent =
                responsibleName;

        }
        else {

            signedByName.textContent =
                responsibleName;

        }

    }


    if (confirmWeekNumber) {

        confirmWeekNumber.textContent =
            String(
                weekInfo.week
            );

    }

}


// ============================================================
// CREATE WEEK PREVIEW ITEM
// ============================================================

function createWeekPreviewItem(
    friday
) {

    const assignment =
        getStoredAssignmentForFriday(
            friday
        );


    const responsibleMember =
        getResponsibleMemberForFriday(
            friday
        );


    const responsibleName =
        assignment
            ? getAssignmentDisplayName(
                assignment
            )
            : getMemberDisplayName(
                responsibleMember
            );


    const weekInfo =
        getIsoWeekInfo(
            friday
        );


    const item =
        document.createElement(
            "button"
        );


    item.type =
        "button";


    item.className =
        "resident-week-preview-item";


    if (
        selectedFriday &&
        isSameDate(
            friday,
            selectedFriday
        )
    ) {

        item.classList.add(
            "active"
        );

    }


    if (
        currentWeekFriday &&
        isSameDate(
            friday,
            currentWeekFriday
        )
    ) {

        item.classList.add(
            "current"
        );

    }


    const weekColumn =
        document.createElement(
            "div"
        );


    weekColumn.className =
        "resident-week-preview-week";


    const weekLabel =
        document.createElement(
            "strong"
        );


    weekLabel.textContent =
        t(
            "weekLabel",
            {
                week:
                weekInfo.week
            }
        );


    const dateLabel =
        document.createElement(
            "span"
        );


    dateLabel.textContent =
        formatShortDate(
            friday
        );


    weekColumn.appendChild(
        weekLabel
    );


    weekColumn.appendChild(
        dateLabel
    );


    const responsibleColumn =
        document.createElement(
            "div"
        );


    responsibleColumn.className =
        "resident-week-preview-responsible";


    const responsibleLabel =
        document.createElement(
            "strong"
        );


    responsibleLabel.textContent =
        responsibleName;


    const statusLabel =
        document.createElement(
            "span"
        );


    statusLabel.textContent =
        getAssignmentStatusText(
            assignment,
            friday
        );


    responsibleColumn.appendChild(
        responsibleLabel
    );


    responsibleColumn.appendChild(
        statusLabel
    );


    item.appendChild(
        weekColumn
    );


    item.appendChild(
        responsibleColumn
    );


    item.addEventListener(
        "click",
        async function () {

            if (
                isSavingDocumentation ||
                isSavingTaskCompletion ||
                isSigningCleaning
            ) {

                return;

            }


            stopDirectCamera();


            selectedFriday =
                new Date(
                    friday.getFullYear(),
                    friday.getMonth(),
                    friday.getDate()
                );


            currentCleaningDocumentation =
                [];


            await ensureWeekAssignment(
                selectedFriday
            );


            await renderCleaningSchedule();

        }
    );


    return item;

}


// ============================================================
// RENDER WEEK PREVIEW
// ============================================================

function renderWeekPreview() {

    if (
        !weekPreviewList ||
        !selectedFriday
    ) {

        return;

    }


    weekPreviewList.innerHTML =
        "";


    /*
     * Vis fem uker:
     *
     * - to uker før valgt uke
     * - valgt uke
     * - to uker etter valgt uke
     */

    for (
        let offset = -2;
        offset <= 2;
        offset++
    ) {

        const friday =
            addDays(
                selectedFriday,
                offset * 7
            );


        weekPreviewList.appendChild(
            createWeekPreviewItem(
                friday
            )
        );

    }

}


// ============================================================
// PREVIOUS WEEK
// ============================================================

if (previousWeekButton) {

    previousWeekButton.addEventListener(
        "click",
        async function () {

            if (
                !selectedFriday ||
                isSavingDocumentation ||
                isSavingTaskCompletion ||
                isSigningCleaning
            ) {

                return;

            }


            stopDirectCamera();


            selectedFriday =
                addDays(
                    selectedFriday,
                    -7
                );


            currentCleaningDocumentation =
                [];


            await ensureWeekAssignment(
                selectedFriday
            );


            await renderCleaningSchedule();

        }
    );

}


// ============================================================
// NEXT WEEK
// ============================================================

if (nextWeekButton) {

    nextWeekButton.addEventListener(
        "click",
        async function () {

            if (
                !selectedFriday ||
                isSavingDocumentation ||
                isSavingTaskCompletion ||
                isSigningCleaning
            ) {

                return;

            }


            stopDirectCamera();


            selectedFriday =
                addDays(
                    selectedFriday,
                    7
                );


            currentCleaningDocumentation =
                [];


            await ensureWeekAssignment(
                selectedFriday
            );


            await renderCleaningSchedule();

        }
    );

}


// ============================================================
// RENDER CLEANING SCHEDULE
// ============================================================

async function renderCleaningSchedule() {

    if (
        !currentCleaningPlan ||
        !selectedFriday
    ) {

        return;

    }


    /*
     * Sørg for at både denne uken og
     * valgt uke har stabile assignments
     * i databasen.
     */

    if (currentWeekFriday) {

        await ensureWeekAssignment(
            currentWeekFriday
        );

    }


    await ensureWeekAssignment(
        selectedFriday
    );


    renderCurrentWeekCard();

    renderSelectedWeek();

    renderWeekPreview();


    await loadCleaningCompletionsForSelectedWeek();


    await loadCleaningDocumentationForSelectedWeek();


    await renderCleaningTasks();


    updateCompletionControls();


    renderPhotoPreviews();


    updateConfirmButtonState();

}

// ============================================================
// LOAD CLEANING COMPLETIONS FOR SELECTED WEEK
// ============================================================

async function loadCleaningCompletionsForSelectedWeek() {

    currentCleaningCompletions =
        [];


    if (
        !currentCleaningPlan ||
        !selectedFriday
    ) {

        return;

    }


    const weekStart =
        dateToIso(
            selectedFriday
        );


    const {
        data,
        error
    } =
        await supabaseClient
            .from(
                "cleaning_completions"
            )
            .select(
                `
                id,
                plan_id,
                task_id,
                resident_id,
                week_start,
                completed_at
                `
            )
            .eq(
                "plan_id",
                currentCleaningPlan.id
            )
            .eq(
                "week_start",
                weekStart
            );


    if (error) {

        console.error(
            "LOAD CLEANING COMPLETIONS ERROR:",
            error
        );

        return;

    }


    currentCleaningCompletions =
        data ||
        [];

}


// ============================================================
// IS TASK COMPLETED
// ============================================================

function isTaskCompleted(
    taskId
) {

    return currentCleaningCompletions.some(
        function (completion) {

            return (
                completion.task_id ===
                taskId
            );

        }
    );

}


// ============================================================
// GET TASK CHECKBOXES
// ============================================================

function getTaskCheckboxes() {

    if (!cleaningTaskList) {

        return [];

    }


    return Array.from(
        cleaningTaskList.querySelectorAll(
            ".resident-cleaning-checkbox"
        )
    );

}


// ============================================================
// SET TASK CHECKBOXES DISABLED
// ============================================================

function setTaskCheckboxesDisabled(
    disabled
) {

    const checkboxes =
        getTaskCheckboxes();


    checkboxes.forEach(
        function (checkbox) {

            checkbox.disabled =
                disabled;

        }
    );

}


// ============================================================
// ARE ALL TASKS COMPLETED
// ============================================================

function areAllTasksCompleted() {

    const checkboxes =
        getTaskCheckboxes();


    if (
        checkboxes.length ===
        0
    ) {

        return false;

    }


    return checkboxes.every(
        function (checkbox) {

            return (
                checkbox.checked ===
                true
            );

        }
    );

}


// ============================================================
// SAVE TASK COMPLETION
// ============================================================

async function saveTaskCompletion(
    taskId
) {

    if (
        isSavingTaskCompletion ||
        !taskId ||
        !currentCleaningPlan ||
        !currentResident ||
        !selectedFriday
    ) {

        return false;

    }


    if (
        !canCurrentUserComplete() ||
        isSelectedWeekSigned()
    ) {

        return false;

    }


    if (
        isTaskCompleted(
            taskId
        )
    ) {

        return true;

    }


    isSavingTaskCompletion =
        true;


    updateCompletionControls();

    renderPhotoPreviews();

    updateConfirmButtonState();


    try {

        const weekStart =
            dateToIso(
                selectedFriday
            );


        const {
            error
        } =
            await supabaseClient
                .from(
                    "cleaning_completions"
                )
                .insert(
                    {
                        plan_id:
                        currentCleaningPlan.id,

                        task_id:
                        taskId,

                        resident_id:
                        currentResident.id,

                        week_start:
                        weekStart
                    }
                );


        if (error) {

            throw error;

        }


        await loadCleaningCompletionsForSelectedWeek();


        return true;

    }
    catch (error) {

        console.error(
            "SAVE TASK COMPLETION ERROR:",
            error
        );


        window.alert(
            t(
                "couldNotSaveTaskCompletion"
            )
        );


        return false;

    }
    finally {

        isSavingTaskCompletion =
            false;


        await renderCleaningTasks();


        updateCompletionControls();

        renderPhotoPreviews();

        updateConfirmButtonState();

    }

}


// ============================================================
// DELETE TASK COMPLETION
// ============================================================

async function deleteTaskCompletion(
    taskId
) {

    if (
        isSavingTaskCompletion ||
        !taskId ||
        !currentCleaningPlan ||
        !currentResident ||
        !selectedFriday
    ) {

        return false;

    }


    if (
        !canCurrentUserComplete() ||
        isSelectedWeekSigned()
    ) {

        return false;

    }


    const completion =
        currentCleaningCompletions.find(
            function (item) {

                return (
                    item.task_id ===
                    taskId
                );

            }
        );


    if (!completion) {

        return true;

    }


    /*
     * Only delete the completion belonging
     * to this cleaning plan, task, week and
     * current responsible resident.
     */

    if (
        completion.resident_id !==
        currentResident.id
    ) {

        return false;

    }


    isSavingTaskCompletion =
        true;


    updateCompletionControls();

    renderPhotoPreviews();

    updateConfirmButtonState();


    try {

        const {
            error
        } =
            await supabaseClient
                .from(
                    "cleaning_completions"
                )
                .delete()
                .eq(
                    "id",
                    completion.id
                )
                .eq(
                    "resident_id",
                    currentResident.id
                );


        if (error) {

            throw error;

        }


        await loadCleaningCompletionsForSelectedWeek();


        return true;

    }
    catch (error) {

        console.error(
            "DELETE TASK COMPLETION ERROR:",
            error
        );


        window.alert(
            t(
                "couldNotSaveTaskCompletion"
            )
        );


        return false;

    }
    finally {

        isSavingTaskCompletion =
            false;


        await renderCleaningTasks();


        updateCompletionControls();

        renderPhotoPreviews();

        updateConfirmButtonState();

    }

}


// ============================================================
// HANDLE TASK CHECKBOX CHANGE
// ============================================================

async function handleTaskCheckboxChange(
    checkbox,
    taskId
) {

    if (
        !checkbox ||
        !taskId
    ) {

        return;

    }


    const shouldBeChecked =
        checkbox.checked;


    /*
     * Immediately lock the checkbox while
     * the database operation is running.
     */

    checkbox.disabled =
        true;


    let success =
        false;


    if (shouldBeChecked) {

        success =
            await saveTaskCompletion(
                taskId
            );

    }
    else {

        success =
            await deleteTaskCompletion(
                taskId
            );

    }


    /*
     * If Supabase rejected the operation,
     * restore the checkbox from the
     * authoritative database state.
     */

    if (!success) {

        checkbox.checked =
            isTaskCompleted(
                taskId
            );

    }


    updateCompletionControls();

    updateConfirmButtonState();

}




// ============================================================
// CREATE CLEANING TASK ELEMENT
// ============================================================

function createCleaningTaskElement(
    planItem
) {

    const task =
        planItem
            ?.cleaning_tasks;


    if (!task) {

        return null;

    }


    // ========================================================
    // CURRENT LANGUAGE
    // ========================================================

    const languageCode =
        getCurrentLanguageCode();


    // ========================================================
    // FIND TRANSLATION
    // ========================================================

    const translations =
        Array.isArray(
            task.cleaning_task_translations
        )
            ? task.cleaning_task_translations
            : [];


    const selectedTranslation =
        translations.find(
            function (translation) {

                return (
                    translation.language_code ===
                    languageCode
                );

            }
        );


    // ========================================================
    // DISPLAY VALUES
    //
    // Translation is preferred.
    // Original task text is the fallback.
    // ========================================================

    const displayName =
        (
            selectedTranslation &&
            selectedTranslation.name
        )
            ? selectedTranslation.name
            : task.name;


    const displayDescription =
        (
            selectedTranslation &&
            selectedTranslation.description
        )
            ? selectedTranslation.description
            : task.description;


    // ========================================================
    // ROW
    // ========================================================

    const row =
        document.createElement(
            "label"
        );


    row.className =
        "resident-cleaning-task";


    // ========================================================
    // CHECKBOX
    // ========================================================

    const checkbox =
        document.createElement(
            "input"
        );


    checkbox.type =
        "checkbox";


    checkbox.className =
        "resident-cleaning-checkbox";


    checkbox.dataset.taskId =
        task.id;


    checkbox.checked =
        isTaskCompleted(
            task.id
        );


    // ========================================================
    // CONTENT
    // ========================================================

    const content =
        document.createElement(
            "div"
        );


    content.className =
        "resident-cleaning-task-content";


    // ========================================================
    // TASK NAME
    // ========================================================

    const title =
        document.createElement(
            "strong"
        );


    title.textContent =
        displayName ||
        t(
            "cleaningTask"
        );


    content.appendChild(
        title
    );


    // ========================================================
    // TASK DESCRIPTION
    // ========================================================

    if (displayDescription) {

        const description =
            document.createElement(
                "span"
            );


        description.textContent =
            displayDescription;


        content.appendChild(
            description
        );

    }


    // ========================================================
    // ADD ELEMENTS
    // ========================================================

    row.appendChild(
        checkbox
    );


    row.appendChild(
        content
    );


    // ========================================================
    // CHECKBOX CHANGE
    // ========================================================

    checkbox.addEventListener(
        "change",
        async function () {

            await handleTaskCheckboxChange(
                checkbox,
                task.id
            );

        }
    );


    return row;

}


// ============================================================
// RENDER CLEANING TASKS
// ============================================================

async function renderCleaningTasks() {

    if (!cleaningTaskList) {

        return;

    }


    cleaningTaskList.innerHTML =
        "";


    const taskCount =
        currentCleaningTasks.length;


    if (cleaningTaskCount) {

        cleaningTaskCount.textContent =
            String(
                taskCount
            );

    }


    if (
        taskCount ===
        0
    ) {

        if (noCleaningTasksState) {

            noCleaningTasksState.hidden =
                false;

        }


        if (cleaningTasksWrapper) {

            cleaningTasksWrapper.hidden =
                true;

        }


        updateConfirmButtonState();

        return;

    }


    if (noCleaningTasksState) {

        noCleaningTasksState.hidden =
            true;

    }


    if (cleaningTasksWrapper) {

        cleaningTasksWrapper.hidden =
            false;

    }


    currentCleaningTasks.forEach(
        function (planItem) {

            const taskElement =
                createCleaningTaskElement(
                    planItem
                );


            if (taskElement) {

                cleaningTaskList.appendChild(
                    taskElement
                );

            }

        }
    );


    /*
     * Permissions are applied after every
     * render so a rerender cannot accidentally
     * make locked checkboxes editable.
     */

    updateCompletionControls();

}


// ============================================================
// UPDATE COMPLETION CONTROLS
// ============================================================

function updateCompletionControls() {

    const assignment =
        getSelectedWeekAssignment();


    /*
     * No selected assignment.
     */

    if (!assignment) {

        setTaskCheckboxesDisabled(
            true
        );


        if (taskPermissionMessage) {

            taskPermissionMessage.textContent =
                t(
                    "onlyResponsibleResidentCanComplete"
                );

        }


        if (cleaningPermissionNotice) {

            cleaningPermissionNotice.hidden =
                false;

        }


        if (cleaningPermissionText) {

            cleaningPermissionText.textContent =
                t(
                    "onlyResponsibleResidentCanComplete"
                );

        }


        if (responsibleOnlyMessage) {

            responsibleOnlyMessage.textContent =
                t(
                    "onlyResponsibleResidentCanComplete"
                );

        }


        updateConfirmButtonState();

        return;

    }


    /*
     * Signed cleaning is permanently locked.
     */

    if (isSelectedWeekSigned()) {

        setTaskCheckboxesDisabled(
            true
        );


        if (taskPermissionMessage) {

            taskPermissionMessage.textContent =
                t(
                    "cleaningAlreadySigned"
                );

        }


        if (cleaningPermissionNotice) {

            cleaningPermissionNotice.hidden =
                false;

        }


        if (cleaningPermissionText) {

            cleaningPermissionText.textContent =
                t(
                    "cleaningAlreadySigned"
                );

        }


        if (responsibleOnlyMessage) {

            responsibleOnlyMessage.textContent =
                t(
                    "cleaningAlreadySigned"
                );

        }


        updateConfirmButtonState();

        return;

    }


    /*
     * Another resident is responsible.
     */

    if (
        !isCurrentResidentResponsible(
            selectedFriday
        )
    ) {

        setTaskCheckboxesDisabled(
            true
        );


        if (taskPermissionMessage) {

            taskPermissionMessage.textContent =
                t(
                    "onlyResponsibleResidentCanComplete"
                );

        }


        if (cleaningPermissionNotice) {

            cleaningPermissionNotice.hidden =
                false;

        }


        if (cleaningPermissionText) {

            cleaningPermissionText.textContent =
                t(
                    "onlyResponsibleResidentCanComplete"
                );

        }


        if (responsibleOnlyMessage) {

            responsibleOnlyMessage.textContent =
                t(
                    "onlyResponsibleResidentCanComplete"
                );

        }


        updateConfirmButtonState();

        return;

    }


    /*
     * A different week is selected.
     */

    if (
        !isSelectedCurrentWeek()
    ) {

        setTaskCheckboxesDisabled(
            true
        );


        if (taskPermissionMessage) {

            taskPermissionMessage.textContent =
                t(
                    "onlyCurrentWeekCanBeCompleted"
                );

        }


        if (cleaningPermissionNotice) {

            cleaningPermissionNotice.hidden =
                false;

        }


        if (cleaningPermissionText) {

            cleaningPermissionText.textContent =
                t(
                    "onlyCurrentWeekCanBeCompleted"
                );

        }


        if (responsibleOnlyMessage) {

            responsibleOnlyMessage.textContent =
                t(
                    "onlyCurrentWeekCanBeCompleted"
                );

        }


        updateConfirmButtonState();

        return;

    }


    const windowState =
        getCleaningWindowState();


    /*
     * Monday-Wednesday.
     */

    if (
        windowState ===
        "not-open-yet"
    ) {

        setTaskCheckboxesDisabled(
            true
        );


        if (taskPermissionMessage) {

            taskPermissionMessage.textContent =
                t(
                    "notYetAvailableLocked"
                );

        }


        if (cleaningPermissionNotice) {

            cleaningPermissionNotice.hidden =
                false;

        }


        if (cleaningPermissionText) {

            cleaningPermissionText.textContent =
                t(
                    "notYetAvailableLocked"
                );

        }


        if (responsibleOnlyMessage) {

            responsibleOnlyMessage.textContent =
                t(
                    "notYetAvailableLocked"
                );

        }


        updateConfirmButtonState();

        return;

    }


    /*
     * Saturday-Sunday.
     */

    if (
        windowState ===
        "deadline-passed"
    ) {

        setTaskCheckboxesDisabled(
            true
        );


        if (taskPermissionMessage) {

            taskPermissionMessage.textContent =
                t(
                    "deadlineExpiredLocked"
                );

        }


        if (cleaningPermissionNotice) {

            cleaningPermissionNotice.hidden =
                false;

        }


        if (cleaningPermissionText) {

            cleaningPermissionText.textContent =
                t(
                    "deadlineExpiredLocked"
                );

        }


        if (responsibleOnlyMessage) {

            responsibleOnlyMessage.textContent =
                t(
                    "deadlineExpiredLocked"
                );

        }


        updateConfirmButtonState();

        return;

    }


    /*
     * A database operation is currently running.
     */

    if (
        isSavingTaskCompletion ||
        isSavingDocumentation ||
        isSigningCleaning
    ) {

        setTaskCheckboxesDisabled(
            true
        );


        updateConfirmButtonState();

        return;

    }


    /*
     * Responsible resident +
     * current week +
     * Thursday/Friday.
     */

    setTaskCheckboxesDisabled(
        false
    );


    if (taskPermissionMessage) {

        taskPermissionMessage.textContent =
            t(
                "responsibleThisWeekCheckTasks"
            );

    }


    if (cleaningPermissionNotice) {

        cleaningPermissionNotice.hidden =
            false;

    }


    if (cleaningPermissionText) {

        cleaningPermissionText.textContent =
            t(
                "responsibleForThisWeek"
            );

    }


    if (responsibleOnlyMessage) {

        responsibleOnlyMessage.textContent =
            t(
                "completeTasksAndPhotoBeforeSign"
            );

    }


    updateConfirmButtonState();

}

// ============================================================
// CLEANING DOCUMENTATION
// ============================================================


// ============================================================
// LOAD CLEANING DOCUMENTATION FOR SELECTED WEEK
// ============================================================

async function loadCleaningDocumentationForSelectedWeek() {

    currentCleaningDocumentation =
        [];


    const assignment =
        getSelectedWeekAssignment();


    if (
        !assignment ||
        !assignment.id
    ) {

        return;

    }


    const {
        data,
        error
    } =
        await supabaseClient
            .from(
                "cleaning_documentation"
            )
            .select(
                `
                id,
                assignment_id,
                uploaded_by_resident_id,
                storage_path,
                file_name,
                mime_type,
                file_size,
                created_at
                `
            )
            .eq(
                "assignment_id",
                assignment.id
            )
            .order(
                "created_at",
                {
                    ascending:
                        true
                }
            );


    if (error) {

        console.error(
            "LOAD CLEANING DOCUMENTATION ERROR:",
            error
        );

        return;

    }


    const documentation =
        data ||
        [];


    /*
     * Bucketen er privat.
     *
     * Opprett derfor en midlertidig signed URL
     * for hvert dokumentasjonsbilde.
     */

    const documentationWithUrls =
        await Promise.all(

            documentation.map(

                async function (item) {

                    const {
                        data: signedUrlData,
                        error: signedUrlError
                    } =
                        await supabaseClient
                            .storage
                            .from(
                                "cleaning-documentation"
                            )
                            .createSignedUrl(
                                item.storage_path,
                                3600
                            );


                    if (signedUrlError) {

                        console.error(
                            "CREATE DOCUMENTATION SIGNED URL ERROR:",
                            signedUrlError
                        );

                    }


                    return {

                        ...item,

                        signedUrl:
                            signedUrlError
                                ? null
                                : (
                                    signedUrlData
                                        ?.signedUrl ||
                                    null
                                )

                    };

                }

            )

        );


    currentCleaningDocumentation =
        documentationWithUrls;

}


// ============================================================
// RESET DOCUMENTATION VIEW
// ============================================================

function resetSelectedPhotos() {

    currentCleaningDocumentation =
        [];


    renderPhotoPreviews();

}


// ============================================================
// HAS REQUIRED DOCUMENTATION PHOTO
// ============================================================

function hasRequiredPhoto() {

    return (
        currentCleaningDocumentation.length >
        0
    );

}


// ============================================================
// CAN MANAGE DOCUMENTATION
// ============================================================

function canManageDocumentation() {

    const assignment =
        getSelectedWeekAssignment();


    if (
        !assignment ||
        !currentResident
    ) {

        return false;

    }


    if (
        assignment.resident_id !==
        currentResident.id
    ) {

        return false;

    }


    if (
        isSelectedWeekSigned()
    ) {

        return false;

    }


    if (
        !canCurrentUserComplete()
    ) {

        return false;

    }


    if (
        isSavingDocumentation ||
        isSavingTaskCompletion ||
        isSigningCleaning
    ) {

        return false;

    }


    return true;

}


// ============================================================
// SAVE CAMERA DOCUMENTATION
// ============================================================

async function saveCameraDocumentation(
    imageBlob
) {

    if (
        isSavingDocumentation ||
        !imageBlob
    ) {

        return false;

    }


    const assignment =
        getSelectedWeekAssignment();


    if (
        !assignment ||
        !assignment.id ||
        !currentResident ||
        !currentResident.id ||
        !currentProfile ||
        !currentProfile.id
    ) {

        return false;

    }


    if (
        !canCurrentUserComplete() ||
        isSelectedWeekSigned()
    ) {

        return false;

    }


    if (
        assignment.resident_id !==
        currentResident.id
    ) {

        return false;

    }


    if (
        currentCleaningDocumentation.length >=
        MAX_PHOTOS
    ) {

        window.alert(
            "Maks 10 bilder er tillatt."
        );

        return false;

    }


    isSavingDocumentation =
        true;


    renderPhotoPreviews();

    updateCompletionControls();

    updateConfirmButtonState();


    let storagePath =
        null;


    try {

        // ----------------------------------------------------
        // CREATE UNIQUE JPEG FILE NAME
        // ----------------------------------------------------

        const uniqueId =
            (
                window.crypto &&
                typeof window.crypto.randomUUID ===
                "function"
            )
                ? window.crypto.randomUUID()
                : (
                    Date.now() +
                    "-" +
                    Math.random()
                        .toString(16)
                        .slice(2)
                );


        const fileName =
            uniqueId +
            ".jpg";


        /*
         * Storage path:
         *
         * assignment-id/
         * authenticated-profile-id/
         * unique-image.jpg
         */

        storagePath =
            assignment.id +
            "/" +
            currentProfile.id +
            "/" +
            fileName;


        // ----------------------------------------------------
        // SAVE CAMERA IMAGE IN PRIVATE STORAGE
        // ----------------------------------------------------

        const {
            error: uploadError
        } =
            await supabaseClient
                .storage
                .from(
                    "cleaning-documentation"
                )
                .upload(
                    storagePath,
                    imageBlob,
                    {
                        contentType:
                            "image/jpeg",

                        upsert:
                            false
                    }
                );


        if (uploadError) {

            throw uploadError;

        }


        // ----------------------------------------------------
        // SAVE IMAGE METADATA
        // ----------------------------------------------------

        const {
            error: metadataError
        } =
            await supabaseClient
                .from(
                    "cleaning_documentation"
                )
                .insert(
                    {
                        assignment_id:
                        assignment.id,

                        uploaded_by_resident_id:
                        currentResident.id,

                        storage_path:
                        storagePath,

                        file_name:
                        fileName,

                        mime_type:
                            "image/jpeg",

                        file_size:
                        imageBlob.size
                    }
                );


        if (metadataError) {

            /*
             * Storage succeeded but metadata failed.
             *
             * Remove the Storage object so we do not
             * leave an orphaned camera image.
             */

            const {
                error: cleanupError
            } =
                await supabaseClient
                    .storage
                    .from(
                        "cleaning-documentation"
                    )
                    .remove(
                        [
                            storagePath
                        ]
                    );


            if (cleanupError) {

                console.error(
                    "DOCUMENTATION CLEANUP ERROR:",
                    cleanupError
                );

            }


            throw metadataError;

        }


        // ----------------------------------------------------
        // RELOAD DOCUMENTATION
        // ----------------------------------------------------

        await loadCleaningDocumentationForSelectedWeek();


        return true;

    }
    catch (error) {

        console.error(
            "SAVE CAMERA DOCUMENTATION ERROR:",
            error
        );


        window.alert(
            "Bildet kunne ikke lagres. Prøv igjen."
        );


        return false;

    }
    finally {

        /*
         * Important:
         *
         * Set the saving state back to false BEFORE
         * rendering. Otherwise the camera button may
         * remain disabled after the first image.
         */

        isSavingDocumentation =
            false;


        renderPhotoPreviews();

        updateCompletionControls();

        updateConfirmButtonState();

    }

}


// ============================================================
// DELETE CLEANING DOCUMENTATION
// ============================================================

async function deleteCleaningDocumentation(
    item
) {

    if (
        !item ||
        !item.id ||
        !item.storage_path ||
        isSavingDocumentation
    ) {

        return false;

    }


    const assignment =
        getSelectedWeekAssignment();


    if (
        !assignment ||
        !currentResident
    ) {

        return false;

    }


    /*
     * Only the responsible resident may delete
     * documentation from the selected assignment.
     */

    if (
        assignment.resident_id !==
        currentResident.id
    ) {

        return false;

    }


    /*
     * A resident may only delete an image
     * that they created themselves.
     */

    if (
        item.uploaded_by_resident_id !==
        currentResident.id
    ) {

        return false;

    }


    /*
     * No changes are allowed after signing.
     */

    if (
        isSelectedWeekSigned()
    ) {

        return false;

    }


    /*
     * Deletion follows the same completion
     * window as adding documentation.
     */

    if (
        !canCurrentUserComplete()
    ) {

        return false;

    }


    isSavingDocumentation =
        true;


    renderPhotoPreviews();

    updateCompletionControls();

    updateConfirmButtonState();


    try {

        /*
         * Delete the database metadata first.
         *
         * This avoids leaving a database row that
         * points to a Storage object that has already
         * disappeared if the database deletion fails.
         */

        const {
            error: metadataDeleteError
        } =
            await supabaseClient
                .from(
                    "cleaning_documentation"
                )
                .delete()
                .eq(
                    "id",
                    item.id
                )
                .eq(
                    "uploaded_by_resident_id",
                    currentResident.id
                );


        if (metadataDeleteError) {

            throw metadataDeleteError;

        }


        /*
         * Then remove the actual private
         * Storage object.
         */

        const {
            error: storageDeleteError
        } =
            await supabaseClient
                .storage
                .from(
                    "cleaning-documentation"
                )
                .remove(
                    [
                        item.storage_path
                    ]
                );


        if (storageDeleteError) {

            /*
             * The metadata is already deleted.
             * Log the Storage cleanup problem.
             *
             * The user should not be given permission
             * to recreate/delete database metadata
             * from the browser as compensation.
             */

            console.error(
                "DELETE DOCUMENTATION STORAGE ERROR:",
                storageDeleteError
            );

        }


        await loadCleaningDocumentationForSelectedWeek();


        return true;

    }
    catch (error) {

        console.error(
            "DELETE CLEANING DOCUMENTATION ERROR:",
            error
        );


        window.alert(
            "Bildet kunne ikke slettes. Prøv igjen."
        );


        await loadCleaningDocumentationForSelectedWeek();


        return false;

    }
    finally {

        isSavingDocumentation =
            false;


        renderPhotoPreviews();

        updateCompletionControls();

        updateConfirmButtonState();

    }

}


// ============================================================
// CREATE DOCUMENTATION IMAGE ELEMENT
// ============================================================

function createDocumentationImageElement(
    item,
    canDelete
) {

    const wrapper =
        document.createElement(
            "div"
        );


    wrapper.className =
        "resident-photo-preview-item";


    if (
        item &&
        item.signedUrl
    ) {

        const image =
            document.createElement(
                "img"
            );


        image.src =
            item.signedUrl;


        image.alt =
            t(
                "cleaningDocumentationPhoto"
            );


        image.loading =
            "lazy";


        wrapper.appendChild(
            image
        );

    }
    else {

        const unavailable =
            document.createElement(
                "div"
            );


        unavailable.className =
            "resident-photo-preview-unavailable";


        unavailable.textContent =
            "📷";


        wrapper.appendChild(
            unavailable
        );

    }


    if (canDelete) {

        const deleteButton =
            document.createElement(
                "button"
            );


        deleteButton.type =
            "button";


        deleteButton.className =
            "resident-photo-delete-button";


        deleteButton.setAttribute(
            "aria-label",
            t(
                "deletePhoto"
            )
        );


        deleteButton.textContent =
            "×";


        deleteButton.addEventListener(
            "click",
            async function (event) {

                event.preventDefault();

                event.stopPropagation();


                if (
                    deleteButton.disabled
                ) {

                    return;

                }


                deleteButton.disabled =
                    true;


                await deleteCleaningDocumentation(
                    item
                );

            }
        );


        wrapper.appendChild(
            deleteButton
        );

    }


    return wrapper;

}


// ============================================================
// RENDER PHOTO PREVIEWS
// ============================================================

function renderPhotoPreviews() {

    const documentation =
        currentCleaningDocumentation ||
        [];


    // --------------------------------------------------------
    // PHOTO COUNT
    // --------------------------------------------------------

    if (photoCount) {

        photoCount.textContent =
            "Bilder (" +
            documentation.length +
            "/" +
            MAX_PHOTOS +
            ")";

    }


    // --------------------------------------------------------
    // PREVIEW GRID
    // --------------------------------------------------------

    if (photoPreviewGrid) {

        photoPreviewGrid.innerHTML =
            "";

    }


    const assignment =
        getSelectedWeekAssignment();


    const responsibleResident =
        Boolean(
            assignment &&
            currentResident &&
            assignment.resident_id ===
            currentResident.id
        );


    const signed =
        isSelectedWeekSigned();


    const canManage =
        canManageDocumentation();


    // --------------------------------------------------------
    // RENDER EXISTING DOCUMENTATION
    // --------------------------------------------------------

    if (photoPreviewGrid) {

        documentation.forEach(
            function (item) {

                /*
                 * Same-floor residents may see the images
                 * through Supabase RLS, but only the
                 * responsible resident who created the
                 * image may delete it before signing.
                 */

                const canDelete =
                    Boolean(
                        canManage &&
                        responsibleResident &&
                        !signed &&
                        item.uploaded_by_resident_id ===
                        currentResident?.id
                    );


                const element =
                    createDocumentationImageElement(
                        item,
                        canDelete
                    );


                photoPreviewGrid.appendChild(
                    element
                );

            }
        );

    }


    // --------------------------------------------------------
    // CAMERA BUTTON
    // --------------------------------------------------------

    if (cameraButton) {

        const reachedMaximum =
            documentation.length >=
            MAX_PHOTOS;


        cameraButton.disabled =
            Boolean(
                !canManage ||
                signed ||
                reachedMaximum ||
                isSavingDocumentation ||
                isSavingTaskCompletion ||
                isSigningCleaning
            );

    }


    updateConfirmButtonState();

}
// ============================================================
// DIRECT CAMERA
// ============================================================


// ============================================================
// STOP DIRECT CAMERA
// ============================================================

function stopDirectCamera() {

    if (activeCameraStream) {

        activeCameraStream
            .getTracks()
            .forEach(
                function (track) {

                    track.stop();

                }
            );


        activeCameraStream =
            null;

    }


    if (activeCameraOverlay) {

        activeCameraOverlay.remove();


        activeCameraOverlay =
            null;

    }

}


// ============================================================
// CAPTURE CAMERA FRAME
// ============================================================

async function captureCameraFrame(
    video
) {

    if (
        !video ||
        !video.videoWidth ||
        !video.videoHeight
    ) {

        return false;

    }


    const sourceWidth =
        video.videoWidth;


    const sourceHeight =
        video.videoHeight;


    /*
     * Limit the longest side to 1920 px.
     *
     * This keeps documentation images
     * reasonably small while preserving
     * enough detail.
     */

    const maxDimension =
        1920;


    let width =
        sourceWidth;


    let height =
        sourceHeight;


    if (
        Math.max(
            width,
            height
        ) >
        maxDimension
    ) {

        const scale =
            maxDimension /
            Math.max(
                width,
                height
            );


        width =
            Math.round(
                width *
                scale
            );


        height =
            Math.round(
                height *
                scale
            );

    }


    const canvas =
        document.createElement(
            "canvas"
        );


    canvas.width =
        width;


    canvas.height =
        height;


    const context =
        canvas.getContext(
            "2d"
        );


    if (!context) {

        return false;

    }


    context.drawImage(
        video,
        0,
        0,
        width,
        height
    );


    const imageBlob =
        await new Promise(
            function (resolve) {

                canvas.toBlob(
                    function (blob) {

                        resolve(
                            blob
                        );

                    },
                    "image/jpeg",
                    0.85
                );

            }
        );


    if (!imageBlob) {

        return false;

    }


    return await saveCameraDocumentation(
        imageBlob
    );

}


// ============================================================
// OPEN DIRECT CAMERA
// ============================================================

async function openDirectCamera() {

    if (
        !canManageDocumentation()
    ) {

        return;

    }


    if (
        currentCleaningDocumentation.length >=
        MAX_PHOTOS
    ) {

        window.alert(
            "Maks 10 bilder er tillatt."
        );

        return;

    }


    /*
     * getUserMedia only works in a secure
     * browser context.
     *
     * GitHub Pages uses HTTPS, so the
     * deployed application supports this.
     */

    if (
        !navigator.mediaDevices ||
        typeof navigator.mediaDevices.getUserMedia !==
        "function"
    ) {

        window.alert(
            "Kamera er ikke tilgjengelig i denne nettleseren."
        );

        return;

    }


    /*
     * Make sure an old camera session
     * cannot remain open.
     */

    stopDirectCamera();


    try {

        // ----------------------------------------------------
        // REQUEST CAMERA
        // ----------------------------------------------------

        try {

            /*
             * Prefer the rear/environment camera.
             */

            activeCameraStream =
                await navigator
                    .mediaDevices
                    .getUserMedia(
                        {
                            video: {
                                facingMode: {
                                    ideal:
                                        "environment"
                                }
                            },

                            audio:
                                false
                        }
                    );

        }
        catch (preferredCameraError) {

            console.warn(
                "REAR CAMERA REQUEST FAILED, TRYING DEFAULT CAMERA:",
                preferredCameraError
            );


            /*
             * Some desktop browsers and devices
             * do not understand or provide an
             * environment-facing camera.
             *
             * Fall back to any available camera.
             */

            activeCameraStream =
                await navigator
                    .mediaDevices
                    .getUserMedia(
                        {
                            video:
                                true,

                            audio:
                                false
                        }
                    );

        }


        // ----------------------------------------------------
        // CAMERA OVERLAY
        // ----------------------------------------------------

        const overlay =
            document.createElement(
                "div"
            );


        overlay.className =
            "resident-camera-overlay";


        /*
         * Keep the camera usable even if the
         * stylesheet does not yet contain
         * dedicated overlay classes.
         */

        overlay.style.position =
            "fixed";

        overlay.style.inset =
            "0";

        overlay.style.zIndex =
            "99999";

        overlay.style.background =
            "#000";

        overlay.style.display =
            "flex";

        overlay.style.flexDirection =
            "column";

        overlay.style.alignItems =
            "center";

        overlay.style.justifyContent =
            "center";

        overlay.style.padding =
            "16px";

        overlay.style.boxSizing =
            "border-box";


        activeCameraOverlay =
            overlay;


        // ----------------------------------------------------
        // VIDEO PREVIEW
        // ----------------------------------------------------

        const video =
            document.createElement(
                "video"
            );


        video.className =
            "resident-camera-video";


        video.autoplay =
            true;


        video.playsInline =
            true;


        video.muted =
            true;


        video.srcObject =
            activeCameraStream;


        video.style.width =
            "100%";

        video.style.maxWidth =
            "720px";

        video.style.maxHeight =
            "calc(100vh - 130px)";

        video.style.objectFit =
            "contain";

        video.style.background =
            "#000";

        video.style.borderRadius =
            "10px";


        // ----------------------------------------------------
        // BUTTON CONTAINER
        // ----------------------------------------------------

        const buttonContainer =
            document.createElement(
                "div"
            );


        buttonContainer.className =
            "resident-camera-actions";


        buttonContainer.style.display =
            "flex";

        buttonContainer.style.alignItems =
            "center";

        buttonContainer.style.justifyContent =
            "center";

        buttonContainer.style.gap =
            "12px";

        buttonContainer.style.marginTop =
            "16px";

        buttonContainer.style.width =
            "100%";


        // ----------------------------------------------------
        // CANCEL BUTTON
        // ----------------------------------------------------

        const cancelButton =
            document.createElement(
                "button"
            );


        cancelButton.type =
            "button";


        cancelButton.className =
            "resident-camera-cancel-button";


        cancelButton.textContent =
            t(
                "cancel"
            );


        cancelButton.style.padding =
            "12px 18px";

        cancelButton.style.border =
            "none";

        cancelButton.style.borderRadius =
            "8px";

        cancelButton.style.cursor =
            "pointer";

        cancelButton.style.fontWeight =
            "600";


        // ----------------------------------------------------
        // CAPTURE BUTTON
        // ----------------------------------------------------

        const captureButton =
            document.createElement(
                "button"
            );


        captureButton.type =
            "button";


        captureButton.className =
            "resident-camera-capture-button";


        captureButton.textContent =
            "📷 " +
            t(
                "takePhoto"
            );


        captureButton.style.padding =
            "12px 18px";

        captureButton.style.border =
            "none";

        captureButton.style.borderRadius =
            "8px";

        captureButton.style.cursor =
            "pointer";

        captureButton.style.fontWeight =
            "700";


        // ----------------------------------------------------
        // CANCEL CAMERA
        // ----------------------------------------------------

        cancelButton.addEventListener(
            "click",
            function () {

                stopDirectCamera();

            }
        );


        // ----------------------------------------------------
        // CAPTURE IMAGE
        // ----------------------------------------------------

        captureButton.addEventListener(
            "click",
            async function () {

                if (
                    captureButton.disabled ||
                    isSavingDocumentation
                ) {

                    return;

                }


                /*
                 * Recheck permissions immediately
                 * before taking the image.
                 */

                if (
                    !canCurrentUserComplete() ||
                    isSelectedWeekSigned()
                ) {

                    stopDirectCamera();

                    renderPhotoPreviews();

                    updateCompletionControls();

                    updateConfirmButtonState();

                    return;

                }


                if (
                    currentCleaningDocumentation.length >=
                    MAX_PHOTOS
                ) {

                    stopDirectCamera();


                    window.alert(
                        "Maks 10 bilder er tillatt."
                    );


                    renderPhotoPreviews();

                    return;

                }


                captureButton.disabled =
                    true;


                cancelButton.disabled =
                    true;


                const success =
                    await captureCameraFrame(
                        video
                    );

                /*
                 * Close the camera after each
                 * captured image.
                 *
                 * The resident can press
                 * "Ta bilde" again to take
                 * another documentation image.
                 */

                stopDirectCamera();


                if (!success) {

                    window.alert(
                        "Bildet kunne ikke tas eller lagres. Prøv igjen."
                    );

                }


                renderPhotoPreviews();

                updateCompletionControls();

                updateConfirmButtonState();

            }
        );


        // ----------------------------------------------------
        // ADD CAMERA ELEMENTS
        // ----------------------------------------------------

        buttonContainer.appendChild(
            cancelButton
        );


        buttonContainer.appendChild(
            captureButton
        );


        overlay.appendChild(
            video
        );


        overlay.appendChild(
            buttonContainer
        );


        document.body.appendChild(
            overlay
        );


        /*
         * Start video preview after the
         * element is connected to the DOM.
         */

        await video.play();

    }
    catch (error) {

        console.error(
            "DIRECT CAMERA ERROR:",
            error
        );


        stopDirectCamera();


        window.alert(
            "Kunne ikke åpne kameraet. Kontroller kameratillatelsen i nettleseren."
        );

    }

}


// ============================================================
// CAMERA BUTTON
// ============================================================

if (cameraButton) {

    cameraButton.addEventListener(
        "click",
        async function () {

            if (
                cameraButton.disabled ||
                isSavingDocumentation ||
                isSavingTaskCompletion ||
                isSigningCleaning
            ) {

                return;

            }


            await openDirectCamera();

        }
    );

}


// ============================================================
// STOP CAMERA WHEN PAGE IS HIDDEN
// ============================================================

document.addEventListener(
    "visibilitychange",
    function () {

        if (
            document.hidden &&
            activeCameraStream
        ) {

            stopDirectCamera();

        }

    }
);


// ============================================================
// STOP CAMERA BEFORE LEAVING PAGE
// ============================================================

window.addEventListener(
    "pagehide",
    function () {

        stopDirectCamera();

    }
);

// ============================================================
// UPDATE CONFIRM BUTTON STATE
// ============================================================

function updateConfirmButtonState() {

    if (!confirmCleaningButton) {

        return;

    }


    const assignment =
        getSelectedWeekAssignment();


    /*
     * Default:
     * signing is locked.
     */

    confirmCleaningButton.disabled =
        true;


    if (!assignment) {

        return;

    }


    /*
     * A signed cleaning week can never
     * be signed again.
     */

    if (
        isSelectedWeekSigned()
    ) {

        return;

    }


    /*
     * Only the responsible resident,
     * during the current cleaning window,
     * may sign.
     */

    if (
        !canCurrentUserComplete()
    ) {

        return;

    }


    /*
     * Lock while another operation
     * is running.
     */

    if (
        isSavingDocumentation ||
        isSavingTaskCompletion ||
        isSigningCleaning
    ) {

        return;

    }


    /*
     * Every required cleaning task
     * must be completed.
     */

    if (
        !areAllTasksCompleted()
    ) {

        return;

    }


    /*
     * At least one camera documentation
     * image is required.
     */

    if (
        !hasRequiredPhoto()
    ) {

        return;

    }


    /*
     * Everything required by the
     * frontend is satisfied.
     *
     * The database RPC will perform
     * the final authoritative checks.
     */

    confirmCleaningButton.disabled =
        false;

}


// ============================================================
// SIGN CLEANING WEEK
// ============================================================

async function signCleaningWeek() {

    if (
        isSigningCleaning ||
        isSavingDocumentation ||
        isSavingTaskCompletion
    ) {

        return false;

    }


    const assignment =
        getSelectedWeekAssignment();


    if (
        !assignment ||
        !assignment.id
    ) {

        return false;

    }


    if (
        isSelectedWeekSigned()
    ) {

        updateConfirmButtonState();

        return false;

    }


    if (
        !canCurrentUserComplete()
    ) {

        updateCompletionControls();

        updateConfirmButtonState();

        return false;

    }


    if (
        !areAllTasksCompleted()
    ) {

        updateConfirmButtonState();

        return false;

    }


    if (
        !hasRequiredPhoto()
    ) {

        updateConfirmButtonState();

        return false;

    }


    isSigningCleaning =
        true;


    updateCompletionControls();

    renderPhotoPreviews();

    updateConfirmButtonState();


    try {

        /*
         * Final signing is performed by the
         * SECURITY DEFINER database function.
         *
         * The browser does not directly update
         * signed_by, signed_at or status.
         */

        const {
            error
        } =
            await supabaseClient
                .rpc(
                    "sign_cleaning_week",
                    {
                        p_assignment_id:
                        assignment.id
                    }
                );


        if (error) {

            throw error;

        }


        /*
         * Reload authoritative database state
         * after successful signing.
         */

        await loadWeekAssignments();


        await loadCleaningCompletionsForSelectedWeek();


        await loadCleaningDocumentationForSelectedWeek();


        /*
         * Render the complete selected week again.
         *
         * After signed_by / signed_at are loaded,
         * tasks, camera and delete buttons become
         * permanently locked.
         */

        renderCurrentWeekCard();

        renderSelectedWeek();

        renderWeekPreview();


        await renderCleaningTasks();


        updateCompletionControls();

        renderPhotoPreviews();

        updateConfirmButtonState();


        return true;

    }
    catch (error) {

        console.error(
            "SIGN CLEANING WEEK ERROR:",
            error
        );


        /*
         * Do not mark anything as signed locally.
         *
         * Reload the database assignment in case
         * the RPC succeeded but the response was
         * interrupted.
         */

        await loadWeekAssignments();


        await loadCleaningDocumentationForSelectedWeek();


        window.alert(
            "Rengjøringen kunne ikke signeres. Kontroller at alle oppgaver er fullført og at minst ett bilde er lagret."
        );


        return false;

    }
    finally {

        isSigningCleaning =
            false;


        renderCurrentWeekCard();

        renderSelectedWeek();

        renderWeekPreview();


        await renderCleaningTasks();


        updateCompletionControls();

        renderPhotoPreviews();

        updateConfirmButtonState();

    }

}


// ============================================================
// CONFIRM CLEANING BUTTON
// ============================================================

if (confirmCleaningButton) {

    confirmCleaningButton.addEventListener(
        "click",
        async function () {

            if (
                confirmCleaningButton.disabled ||
                isSigningCleaning ||
                isSavingDocumentation ||
                isSavingTaskCompletion
            ) {

                return;

            }


            await signCleaningWeek();

        }
    );

}


// ============================================================
// REFRESH PROFILE LANGUAGE
// ============================================================

function refreshProfileLanguage() {

    if (
        currentProfile &&
        welcomeTitle
    ) {

        welcomeTitle.textContent =
            t(
                "welcomeUser",
                {
                    name:
                    currentProfile.full_name
                }
            );

    }


    if (
        currentProfile &&
        residentName
    ) {

        residentName.textContent =
            currentProfile.full_name;

    }

}


// ============================================================
// REFRESH PROPERTY LANGUAGE
// ============================================================

function refreshPropertyLanguage() {

    if (!currentResident) {

        return;

    }


    const property =
        currentResident.properties;


    const floor =
        currentResident.floors;


    if (propertyName) {

        propertyName.textContent =
            property?.name ||
            t(
                "propertyFallbackName"
            );

    }


    if (propertyAddress) {

        propertyAddress.textContent =
            property?.address ||
            t(
                "noAddressRegistered"
            );

    }


    if (floorName) {

        floorName.textContent =
            t(
                "floorPrefix",
                {
                    floor:
                        getFloorDisplayName(
                            floor
                        )
                }
            );

    }


    if (currentWeekFloor) {

        currentWeekFloor.textContent =
            getFloorDisplayName(
                floor
            );

    }


    if (cleaningPlanSubtitle) {

        if (currentCleaningPlan) {

            cleaningPlanSubtitle.textContent =
                (
                    property?.name ||
                    t(
                        "propertyFallbackName"
                    )
                ) +
                " • " +
                getFloorDisplayName(
                    floor
                );

        }
        else {

            cleaningPlanSubtitle.textContent =
                t(
                    "noActiveCleaningPlan"
                );

        }

    }

}


// ============================================================
// REFRESH CLEANING LANGUAGE
// ============================================================

function refreshCleaningLanguage() {

    if (
        !currentCleaningPlan ||
        !selectedFriday
    ) {

        return;

    }


    renderCurrentWeekCard();

    renderSelectedWeek();

    renderWeekPreview();

    renderCleaningTasks();

    updateCompletionControls();

    renderPhotoPreviews();

    updateConfirmButtonState();

}


// ============================================================
// REFRESH ALL RESIDENT LANGUAGE
// ============================================================

function refreshResidentLanguage() {

    /*
     * Translate all static HTML elements
     * using data-i18n first.
     */

    if (
        window.CleanPlanI18n &&
        typeof window.CleanPlanI18n.applyTranslations ===
        "function"
    ) {

        window.CleanPlanI18n
            .applyTranslations();

    }


    refreshProfileLanguage();

    refreshPropertyLanguage();

    refreshCleaningLanguage();


    if (hasLoadedCleaningHistory) {

        renderCleaningHistory();

    }

}
// ============================================================
// RESET CLEANING HISTORY
// ============================================================

function resetCleaningHistory() {

    currentCleaningHistory =
        [];

    isLoadingCleaningHistory =
        false;

    hasLoadedCleaningHistory =
        false;


    if (cleaningHistoryList) {

        cleaningHistoryList.innerHTML =
            "";

    }


    if (cleaningHistoryLoading) {

        cleaningHistoryLoading.hidden =
            true;

    }


    if (cleaningHistoryEmpty) {

        cleaningHistoryEmpty.hidden =
            true;

    }

}


// ============================================================
// FORMAT CLEANING HISTORY SIGNED TIME
// ============================================================

function formatCleaningHistorySignedAt(
    value
) {

    if (!value) {

        return "-";

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

        return "-";

    }


    return new Intl.DateTimeFormat(
        getCurrentDateLocale(),
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
                "2-digit"
        }
    ).format(
        date
    );

}


// ============================================================
// HISTORY ASSIGNMENT COMPLETED
// ============================================================

function isCleaningHistoryCompleted(
    assignment
) {

    if (!assignment) {

        return false;

    }


    return Boolean(
        assignment.signed_by ||
        assignment.signed_at ||
        assignment.status ===
        "completed"
    );

}


// ============================================================
// LOAD CLEANING HISTORY DOCUMENTATION URLS
// ============================================================

async function addSignedUrlsToCleaningHistoryDocumentation(
    documentation
) {

    return Promise.all(

        (
            documentation ||
            []
        ).map(

            async function (
                item
            ) {

                const {
                    data,
                    error
                } =
                    await supabaseClient
                        .storage
                        .from(
                            "cleaning-documentation"
                        )
                        .createSignedUrl(
                            item.storage_path,
                            3600
                        );


                if (error) {

                    console.error(
                        "CREATE CLEANING HISTORY SIGNED URL ERROR:",
                        error
                    );

                }


                return {

                    ...item,

                    signedUrl:
                        error
                            ? null
                            : (
                                data
                                    ?.signedUrl ||
                                null
                            )

                };

            }

        )

    );

}


// ============================================================
// LOAD CLEANING HISTORY
// ============================================================

async function loadCleaningHistory() {

    if (
        isLoadingCleaningHistory ||
        !currentCleaningPlan ||
        !currentResident
    ) {

        return;

    }


    isLoadingCleaningHistory =
        true;


    if (cleaningHistoryLoading) {

        cleaningHistoryLoading.hidden =
            false;

    }


    if (cleaningHistoryEmpty) {

        cleaningHistoryEmpty.hidden =
            true;

    }


    if (cleaningHistoryList) {

        cleaningHistoryList.innerHTML =
            "";

    }


    try {

        const currentFriday =
            getCurrentWeekFriday();

        const currentFridayIso =
            dateToIso(
                currentFriday
            );

        const planStartDate =
            normalizeDate(
                currentCleaningPlan
                    .start_date
            );

        const planStartFriday =
            planStartDate
                ? getFridayForDate(
                    planStartDate
                )
                : null;

        const planStartIso =
            planStartFriday
                ? dateToIso(
                    planStartFriday
                )
                : null;


        let assignmentQuery =
            supabaseClient
                .from(
                    "cleaning_week_assignments"
                )
                .select(
                    `
                    id,
                    plan_id,
                    week_start,
                    resident_id,
                    status,
                    signed_by,
                    signed_at,

                    residents (
                        id,
                        profile_id,
                        property_id,
                        floor_id,
                        is_active,

                        profiles (
                            id,
                            full_name
                        )
                    )
                    `
                )
                .eq(
                    "plan_id",
                    currentCleaningPlan.id
                )
                .lt(
                    "week_start",
                    currentFridayIso
                );


        if (planStartIso) {

            assignmentQuery =
                assignmentQuery.gte(
                    "week_start",
                    planStartIso
                );

        }


        const {
            data:
                assignmentData,

            error:
                assignmentError
        } =
            await assignmentQuery
                .order(
                    "week_start",
                    {
                        ascending:
                            false
                    }
                );


        if (assignmentError) {

            throw assignmentError;

        }


        const assignments =
            assignmentData ||
            [];


        if (
            assignments.length ===
            0
        ) {

            currentCleaningHistory =
                [];

            hasLoadedCleaningHistory =
                true;

            renderCleaningHistory();

            return;

        }


        const signerIds =
            [
                ...new Set(
                    assignments
                        .map(
                            function (
                                assignment
                            ) {

                                return assignment
                                    .signed_by;

                            }
                        )
                        .filter(
                            Boolean
                        )
                )
            ];


        const signerProfileMap =
            {};


        if (
            signerIds.length >
            0
        ) {

            const {
                data:
                    signerData,

                error:
                    signerError
            } =
                await supabaseClient
                    .from(
                        "profiles"
                    )
                    .select(
                        `
                        id,
                        full_name
                        `
                    )
                    .in(
                        "id",
                        signerIds
                    );


            if (signerError) {

                console.warn(
                    "LOAD CLEANING HISTORY SIGNERS ERROR:",
                    signerError
                );

            }
            else {

                (
                    signerData ||
                    []
                ).forEach(
                    function (
                        profile
                    ) {

                        signerProfileMap[
                            profile.id
                            ] =
                            profile;

                    }
                );

            }

        }


        const assignmentIds =
            assignments.map(
                function (
                    assignment
                ) {

                    return assignment.id;

                }
            );


        let documentation =
            [];


        if (
            assignmentIds.length >
            0
        ) {

            const {
                data:
                    documentationData,

                error:
                    documentationError
            } =
                await supabaseClient
                    .from(
                        "cleaning_documentation"
                    )
                    .select(
                        `
                        id,
                        assignment_id,
                        uploaded_by_resident_id,
                        storage_path,
                        file_name,
                        mime_type,
                        file_size,
                        created_at
                        `
                    )
                    .in(
                        "assignment_id",
                        assignmentIds
                    )
                    .order(
                        "created_at",
                        {
                            ascending:
                                true
                        }
                    );


            if (documentationError) {

                throw documentationError;

            }


            documentation =
                await addSignedUrlsToCleaningHistoryDocumentation(
                    documentationData ||
                    []
                );

        }


        const documentationMap =
            {};


        documentation.forEach(
            function (
                item
            ) {

                if (
                    !documentationMap[
                        item.assignment_id
                        ]
                ) {

                    documentationMap[
                        item.assignment_id
                        ] =
                        [];

                }


                documentationMap[
                    item.assignment_id
                    ].push(
                    item
                );

            }
        );


        currentCleaningHistory =
            assignments.map(
                function (
                    assignment
                ) {

                    const responsibleName =
                        assignment
                            .residents
                            ?.profiles
                            ?.full_name ||
                        t(
                            "notAssigned"
                        );

                    const signerProfile =
                        assignment.signed_by
                            ? (
                                signerProfileMap[
                                    assignment.signed_by
                                    ] ||
                                null
                            )
                            : null;

                    const signerName =
                        signerProfile
                            ?.full_name ||
                        (
                            isCleaningHistoryCompleted(
                                assignment
                            )
                                ? responsibleName
                                : "-"
                        );


                    return {

                        assignment:
                        assignment,

                        responsibleName:
                        responsibleName,

                        signerName:
                        signerName,

                        documentation:
                            documentationMap[
                                assignment.id
                                ] ||
                            []

                    };

                }
            );


        hasLoadedCleaningHistory =
            true;


        renderCleaningHistory();

    }
    catch (error) {

        console.error(
            "LOAD CLEANING HISTORY ERROR:",
            error
        );


        currentCleaningHistory =
            [];

        hasLoadedCleaningHistory =
            false;


        if (cleaningHistoryList) {

            cleaningHistoryList.innerHTML =
                "";

        }


        if (cleaningHistoryEmpty) {

            cleaningHistoryEmpty.hidden =
                false;

        }

    }
    finally {

        isLoadingCleaningHistory =
            false;


        if (cleaningHistoryLoading) {

            cleaningHistoryLoading.hidden =
                true;

        }

    }

}


// ============================================================
// CREATE CLEANING HISTORY DETAIL
// ============================================================

function createCleaningHistoryDetail(
    label,
    value
) {

    const detail =
        document.createElement(
            "div"
        );

    detail.className =
        "resident-history-detail";


    const detailLabel =
        document.createElement(
            "span"
        );

    detailLabel.textContent =
        label;


    const detailValue =
        document.createElement(
            "strong"
        );

    detailValue.textContent =
        value ||
        "-";


    detail.appendChild(
        detailLabel
    );

    detail.appendChild(
        detailValue
    );


    return detail;

}


// ============================================================
// CREATE CLEANING HISTORY PHOTO
// ============================================================

function createCleaningHistoryPhoto(
    item,
    index
) {

    if (
        !item ||
        !item.signedUrl
    ) {

        return null;

    }


    const link =
        document.createElement(
            "a"
        );

    link.className =
        "resident-history-photo";

    link.href =
        item.signedUrl;

    link.target =
        "_blank";

    link.rel =
        "noopener noreferrer";


    const image =
        document.createElement(
            "img"
        );

    image.src =
        item.signedUrl;

    image.alt =
        t(
            "cleaningDocumentationPhoto"
        ) +
        " " +
        String(
            index +
            1
        );

    image.loading =
        "lazy";


    link.appendChild(
        image
    );


    return link;

}


// ============================================================
// CREATE CLEANING HISTORY ITEM
// ============================================================

function createCleaningHistoryItem(
    historyItem
) {

    if (
        !historyItem ||
        !historyItem.assignment
    ) {

        return null;

    }


    const assignment =
        historyItem.assignment;

    const friday =
        normalizeDate(
            assignment.week_start
        );

    const weekInfo =
        friday
            ? getIsoWeekInfo(
                friday
            )
            : {
                week:
                    "-",

                year:
                    "-"
            };

    const completed =
        isCleaningHistoryCompleted(
            assignment
        );


    const item =
        document.createElement(
            "article"
        );

    item.className =
        "resident-history-item";


    const header =
        document.createElement(
            "div"
        );

    header.className =
        "resident-history-item-header";


    const titleWrapper =
        document.createElement(
            "div"
        );

    titleWrapper.className =
        "resident-history-item-title";


    const title =
        document.createElement(
            "h3"
        );

    title.textContent =
        t(
            "cleaningHistoryWeek"
        ) +
        " " +
        String(
            weekInfo.week
        );


    const date =
        document.createElement(
            "span"
        );

    date.textContent =
        friday
            ? formatDisplayDate(
                friday
            )
            : "-";


    titleWrapper.appendChild(
        title
    );

    titleWrapper.appendChild(
        date
    );


    const status =
        document.createElement(
            "span"
        );

    status.className =
        "resident-history-status " +
        (
            completed
                ? "completed"
                : "not-completed"
        );

    status.textContent =
        completed
            ? t(
                "completed"
            )
            : t(
                "notCompleted"
            );


    header.appendChild(
        titleWrapper
    );

    header.appendChild(
        status
    );


    const details =
        document.createElement(
            "div"
        );

    details.className =
        "resident-history-details";


    details.appendChild(
        createCleaningHistoryDetail(
            t(
                "cleaningHistoryResponsible"
            ),
            historyItem.responsibleName
        )
    );

    details.appendChild(
        createCleaningHistoryDetail(
            t(
                "cleaningHistorySignedBy"
            ),
            completed
                ? historyItem.signerName
                : "-"
        )
    );

    details.appendChild(
        createCleaningHistoryDetail(
            t(
                "cleaningHistorySignedAt"
            ),
            completed
                ? formatCleaningHistorySignedAt(
                    assignment.signed_at
                )
                : "-"
        )
    );


    const documentationSection =
        document.createElement(
            "div"
        );

    documentationSection.className =
        "resident-history-documentation";


    const documentationTitle =
        document.createElement(
            "h4"
        );

    documentationTitle.className =
        "resident-history-documentation-title";

    documentationTitle.textContent =
        t(
            "cleaningHistoryDocumentation"
        );


    documentationSection.appendChild(
        documentationTitle
    );


    const visibleDocumentation =
        (
            historyItem.documentation ||
            []
        ).filter(
            function (
                documentationItem
            ) {

                return Boolean(
                    documentationItem
                        .signedUrl
                );

            }
        );


    if (
        visibleDocumentation.length ===
        0
    ) {

        const emptyDocumentation =
            document.createElement(
                "p"
            );

        emptyDocumentation.textContent =
            t(
                "cleaningHistoryNoDocumentation"
            );

        documentationSection.appendChild(
            emptyDocumentation
        );

    }
    else {

        const photoGrid =
            document.createElement(
                "div"
            );

        photoGrid.className =
            "resident-history-photo-grid";


        visibleDocumentation.forEach(
            function (
                documentationItem,
                index
            ) {

                const photo =
                    createCleaningHistoryPhoto(
                        documentationItem,
                        index
                    );


                if (photo) {

                    photoGrid.appendChild(
                        photo
                    );

                }

            }
        );


        documentationSection.appendChild(
            photoGrid
        );

    }


    item.appendChild(
        header
    );

    item.appendChild(
        details
    );

    item.appendChild(
        documentationSection
    );


    return item;

}


// ============================================================
// RENDER CLEANING HISTORY
// ============================================================

function renderCleaningHistory() {

    if (!cleaningHistoryList) {

        return;

    }


    cleaningHistoryList.innerHTML =
        "";


    if (
        !hasLoadedCleaningHistory ||
        currentCleaningHistory.length ===
        0
    ) {

        if (cleaningHistoryEmpty) {

            cleaningHistoryEmpty.hidden =
                !hasLoadedCleaningHistory;

        }

        return;

    }


    if (cleaningHistoryEmpty) {

        cleaningHistoryEmpty.hidden =
            true;

    }


    currentCleaningHistory.forEach(
        function (
            historyItem
        ) {

            const item =
                createCleaningHistoryItem(
                    historyItem
                );


            if (item) {

                cleaningHistoryList.appendChild(
                    item
                );

            }

        }
    );

}


// ============================================================
// OPEN CLEANING HISTORY
// ============================================================

async function openCleaningHistory() {

    if (!cleaningHistorySection) {

        return;

    }


    cleaningHistorySection.hidden =
        false;


    if (cleaningHistoryButton) {

        cleaningHistoryButton.setAttribute(
            "aria-expanded",
            "true"
        );

    }


    cleaningHistorySection.scrollIntoView(
        {
            behavior:
                "smooth",

            block:
                "start"
        }
    );


    await loadCleaningHistory();

}


// ============================================================
// CLOSE CLEANING HISTORY
// ============================================================

function closeCleaningHistory() {

    if (!cleaningHistorySection) {

        return;

    }


    cleaningHistorySection.hidden =
        true;


    if (cleaningHistoryButton) {

        cleaningHistoryButton.setAttribute(
            "aria-expanded",
            "false"
        );

    }

}


// ============================================================
// CLEANING HISTORY BUTTON
// ============================================================

if (cleaningHistoryButton) {

    cleaningHistoryButton.addEventListener(
        "click",
        async function () {

            await openCleaningHistory();

        }
    );

}


// ============================================================
// CLOSE CLEANING HISTORY BUTTON
// ============================================================

if (closeCleaningHistoryButton) {

    closeCleaningHistoryButton.addEventListener(
        "click",
        function () {

            closeCleaningHistory();

        }
    );

}


// ============================================================
// LANGUAGE CHANGE EVENT
// ============================================================

window.addEventListener(
    "cleanplan:languagechange",
    function () {

        refreshResidentLanguage();

    }
);

// ============================================================
// INITIALIZE RESIDENT PAGE
// ============================================================

async function initializeResidentPage() {

    try {

        // ----------------------------------------------------
        // INITIAL PAGE STATE
        // ----------------------------------------------------

        hideContentSections();


        if (loadingSection) {

            loadingSection.hidden =
                false;

        }


        // ----------------------------------------------------
        // AUTHENTICATION + PROFILE
        // ----------------------------------------------------

        const access =
            await checkResidentAccess();


        if (!access) {

            return;

        }


        // ----------------------------------------------------
        // RESIDENT / PROPERTY ASSOCIATION
        // ----------------------------------------------------

        const associationResult =
            await loadResidentAssociation(
                access.profile.id
            );


        if (
            !associationResult ||
            !associationResult.success
        ) {

            return;

        }


        /*
         * Resident account exists, but the
         * administrator has not yet connected
         * it to a property/floor.
         *
         * loadResidentAssociation() already
         * displays the waiting section.
         */

        if (
            !associationResult.resident
        ) {

            refreshResidentLanguage();

            return;

        }


        // ----------------------------------------------------
        // CLEANING PLAN
        // ----------------------------------------------------

        await loadCleaningPlan();


        // ----------------------------------------------------
        // APPLY CURRENT LANGUAGE
        // ----------------------------------------------------

        refreshResidentLanguage();

    }
    catch (error) {

        console.error(
            "INITIALIZE RESIDENT PAGE ERROR:",
            error
        );


        showError(
            t(
                "unexpectedResidentPageError"
            )
        );

    }

}


// ============================================================
// START RESIDENT PAGE
// ============================================================

initializeResidentPage();

