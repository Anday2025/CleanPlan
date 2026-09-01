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

const cameraInput =
    document.getElementById(
        "cameraInput"
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

let currentWeekFriday =
    null;

let selectedFriday =
    null;

let selectedResponsibleMember =
    null;

let selectedPhotos =
    [];

let isSavingTaskCompletion =
    false;


// ============================================================
// CONSTANTS
// ============================================================

const MAX_PHOTOS =
    6;


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
     * This fallback should normally never be needed,
     * because language.js is loaded before resident.js.
     */

    return key;

}


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
// DATE HELPERS
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
        String(value)
            .split("-");


    if (
        parts.length ===
        3
    ) {

        return new Date(
            Number(parts[0]),
            Number(parts[1]) - 1,
            Number(parts[2])
        );

    }


    const parsed =
        new Date(value);


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


    /*
     * JavaScript:
     *
     * Sunday    = 0
     * Monday    = 1
     * Tuesday   = 2
     * Wednesday = 3
     * Thursday  = 4
     * Friday    = 5
     * Saturday  = 6
     */


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


    if (
        day >=
        1 &&
        day <=
        3
    ) {

        return "not-open-yet";

    }


    if (
        day ===
        4 ||
        day ===
        5
    ) {

        return "open";

    }


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


    if (
        !profile.is_active
    ) {

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

    selectedResponsibleMember =
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


    resetSelectedPhotos();

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
                    is_active
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

                return (
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

                return (
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


    const currentFriday =
        getCurrentWeekFriday();


    const rangeStart =
        addDays(
            currentFriday,
            -56
        );


    const rangeEnd =
        addDays(
            currentFriday,
            112
        );


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
            .gte(
                "week_start",
                dateToIso(
                    rangeStart
                )
            )
            .lte(
                "week_start",
                dateToIso(
                    rangeEnd
                )
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


        currentWeekAssignments =
            {};

        return;

    }


    (
        data ||
        []
    ).forEach(
        function (assignment) {

            if (
                !assignment.week_start
            ) {

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
// GET MEMBER NAME
// ============================================================

function getMemberName(
    member
) {

    if (
        !member ||
        !member.residents
    ) {

        return t(
            "notAssigned"
        );

    }


    return (
        member.residents
            .profiles
            ?.full_name ||
        t(
            "notAssigned"
        )
    );

}


// ============================================================
// GET MEMBER RESIDENT ID
// ============================================================

function getMemberResidentId(
    member
) {

    if (
        !member ||
        !member.residents
    ) {

        return null;

    }


    return (
        member.residents.id ||
        null
    );

}


// ============================================================
// GET ASSIGNMENT RESIDENT ID
// ============================================================

function getAssignmentResidentId(
    assignment
) {

    if (!assignment) {

        return null;

    }


    return (
        assignment.resident_id ||
        assignment.residents?.id ||
        null
    );

}


// ============================================================
// GET ASSIGNMENT NAME
// ============================================================

function getAssignmentName(
    assignment
) {

    if (!assignment) {

        return t(
            "notAssigned"
        );

    }


    return (
        assignment.residents
            ?.profiles
            ?.full_name ||
        t(
            "notAssigned"
        )
    );

}


// ============================================================
// FIND MEMBER BY RESIDENT ID
// ============================================================

function findMemberByResidentId(
    residentId
) {

    if (!residentId) {

        return null;

    }


    return (
        currentCleaningMembers.find(
            function (member) {

                return (
                    getMemberResidentId(
                        member
                    ) ===
                    residentId
                );

            }
        ) ||
        null
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


    return (
        currentWeekAssignments[
            dateToIso(
                friday
            )
            ] ||
        null
    );

}


// ============================================================
// GET ROTATION INDEX FOR FRIDAY
// ============================================================

function getRotationIndexForFriday(
    friday
) {

    if (
        !friday ||
        !currentCleaningPlan ||
        !currentCleaningPlan.start_date ||
        currentCleaningMembers.length ===
        0
    ) {

        return -1;

    }


    const planStart =
        normalizeDate(
            currentCleaningPlan.start_date
        );


    if (!planStart) {

        return -1;

    }


    const planStartFriday =
        getFridayForDate(
            planStart
        );


    const differenceMilliseconds =
        startOfDay(
            friday
        ).getTime() -
        startOfDay(
            planStartFriday
        ).getTime();


    const differenceWeeks =
        Math.floor(
            differenceMilliseconds /
            (
                7 *
                24 *
                60 *
                60 *
                1000
            )
        );


    if (
        differenceWeeks <
        0
    ) {

        return -1;

    }


    return (
        differenceWeeks %
        currentCleaningMembers.length
    );

}


// ============================================================
// GET FALLBACK RESPONSIBLE MEMBER
// ============================================================

function getFallbackResponsibleMember(
    friday
) {

    const rotationIndex =
        getRotationIndexForFriday(
            friday
        );


    if (
        rotationIndex <
        0 ||
        rotationIndex >=
        currentCleaningMembers.length
    ) {

        return null;

    }


    return (
        currentCleaningMembers[
            rotationIndex
            ] ||
        null
    );

}


// ============================================================
// GET RESPONSIBLE MEMBER FOR FRIDAY
// ============================================================

function getResponsibleMemberForFriday(
    friday
) {

    const storedAssignment =
        getStoredAssignmentForFriday(
            friday
        );


    if (storedAssignment) {

        const residentId =
            getAssignmentResidentId(
                storedAssignment
            );


        const matchingMember =
            findMemberByResidentId(
                residentId
            );


        if (matchingMember) {

            return matchingMember;

        }


        if (
            storedAssignment.residents
        ) {

            return {

                resident_id:
                residentId,

                residents:
                storedAssignment
                    .residents

            };

        }

    }


    return getFallbackResponsibleMember(
        friday
    );

}


// ============================================================
// GET RESPONSIBLE NAME FOR FRIDAY
// ============================================================

function getResponsibleNameForFriday(
    friday
) {

    const storedAssignment =
        getStoredAssignmentForFriday(
            friday
        );


    if (storedAssignment) {

        const assignmentName =
            getAssignmentName(
                storedAssignment
            );


        if (
            assignmentName !==
            t(
                "notAssigned"
            )
        ) {

            return assignmentName;

        }

    }


    return getMemberName(
        getResponsibleMemberForFriday(
            friday
        )
    );

}


// ============================================================
// GET OR CREATE WEEK ASSIGNMENT
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


    if (
        currentWeekAssignments[
            fridayIso
            ]
    ) {

        return (
            currentWeekAssignments[
                fridayIso
                ]
        );

    }


    /*
     * The database function is responsible for creating
     * a stable assignment when one does not already exist.
     *
     * RLS and the database function remain the source
     * of truth for access and assignment security.
     */

    const {
        data,
        error
    } =
        await supabaseClient.rpc(
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
            "GET OR CREATE WEEK ASSIGNMENT ERROR:",
            error
        );


        return null;

    }


    /*
     * The RPC can return either one row or an array,
     * depending on the PostgreSQL return definition.
     */

    let assignment =
        null;


    if (
        Array.isArray(
            data
        )
    ) {

        assignment =
            data[0] ||
            null;

    }
    else {

        assignment =
            data ||
            null;

    }


    /*
     * Reload the stored assignments so nested resident/profile
     * information is available for rendering.
     */

    await loadWeekAssignments();


    return (
        currentWeekAssignments[
            fridayIso
            ] ||
        assignment
    );

}


// ============================================================
// GET WEEK STATUS TEXT
// ============================================================

function getWeekStatusText(
    friday
) {

    if (
        !friday ||
        !currentWeekFriday
    ) {

        return t(
            "scheduled"
        );

    }


    const fridayTime =
        startOfDay(
            friday
        ).getTime();


    const currentFridayTime =
        startOfDay(
            currentWeekFriday
        ).getTime();


    if (
        fridayTime <
        currentFridayTime
    ) {

        return t(
            "previousWeekStatus"
        );

    }


    if (
        fridayTime >
        currentFridayTime
    ) {

        return t(
            "upcoming"
        );

    }


    const today =
        new Date();


    const day =
        today.getDay();


    if (
        day >=
        1 &&
        day <=
        3
    ) {

        return t(
            "notAvailableYet"
        );

    }


    if (
        day ===
        4 ||
        day ===
        5
    ) {

        return t(
            "open"
        );

    }


    return t(
        "deadlinePassed"
    );

}


// ============================================================
// GET WEEK STATUS CLASS
// ============================================================

function getWeekStatusClass(
    friday
) {

    if (
        !friday ||
        !currentWeekFriday
    ) {

        return "planned";

    }


    const fridayTime =
        startOfDay(
            friday
        ).getTime();


    const currentFridayTime =
        startOfDay(
            currentWeekFriday
        ).getTime();


    if (
        fridayTime <
        currentFridayTime
    ) {

        return "previous";

    }


    if (
        fridayTime >
        currentFridayTime
    ) {

        return "upcoming";

    }


    const day =
        new Date()
            .getDay();


    if (
        day >=
        1 &&
        day <=
        3
    ) {

        return "not-available";

    }


    if (
        day ===
        4 ||
        day ===
        5
    ) {

        return "open";

    }


    return "deadline-passed";

}


// ============================================================
// APPLY WEEK STATUS CLASS
// ============================================================

function applyWeekStatusClass(
    element,
    friday
) {

    if (!element) {

        return;

    }


    element.classList.remove(
        "planned",
        "previous",
        "upcoming",
        "not-available",
        "open",
        "deadline-passed"
    );


    element.classList.add(
        getWeekStatusClass(
            friday
        )
    );

}


// ============================================================
// RENDER CURRENT WEEK CARD
// ============================================================

function renderCurrentWeekCard() {

    if (!currentWeekFriday) {

        return;

    }


    const weekInfo =
        getIsoWeekInfo(
            currentWeekFriday
        );


    const responsibleMember =
        getResponsibleMemberForFriday(
            currentWeekFriday
        );


    const responsibleName =
        getResponsibleNameForFriday(
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
            getWeekStatusText(
                currentWeekFriday
            );


        applyWeekStatusClass(
            currentWeekStatus,
            currentWeekFriday
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


    /*
     * Keep this reference available when the selected
     * week is also the current week.
     */

    if (
        selectedFriday &&
        isSameDate(
            selectedFriday,
            currentWeekFriday
        )
    ) {

        selectedResponsibleMember =
            responsibleMember;

    }

}


// ============================================================
// RENDER SELECTED WEEK
// ============================================================

function renderSelectedWeek() {

    if (!selectedFriday) {

        return;

    }


    const weekInfo =
        getIsoWeekInfo(
            selectedFriday
        );


    selectedResponsibleMember =
        getResponsibleMemberForFriday(
            selectedFriday
        );


    const responsibleName =
        getResponsibleNameForFriday(
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
            getWeekStatusText(
                selectedFriday
            );


        applyWeekStatusClass(
            selectedWeekStatus,
            selectedFriday
        );

    }


    if (signedByName) {

        signedByName.textContent =
            responsibleName;

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

    const weekInfo =
        getIsoWeekInfo(
            friday
        );


    const responsibleName =
        getResponsibleNameForFriday(
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
        getWeekStatusText(
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

            selectedFriday =
                new Date(
                    friday.getFullYear(),
                    friday.getMonth(),
                    friday.getDate()
                );


            resetSelectedPhotos();


            /*
             * Ensure the selected week has a stable
             * assignment in the database.
             */

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
     * Show five weeks:
     *
     * - two before selected week
     * - selected week
     * - two after selected week
     */

    for (
        let offset = -2;
        offset <= 2;
        offset++
    ) {

        const friday =
            addDays(
                selectedFriday,
                offset *
                7
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

            if (!selectedFriday) {

                return;

            }


            selectedFriday =
                addDays(
                    selectedFriday,
                    -7
                );


            resetSelectedPhotos();


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

            if (!selectedFriday) {

                return;

            }


            selectedFriday =
                addDays(
                    selectedFriday,
                    7
                );


            resetSelectedPhotos();


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
     * Make sure current and selected weeks have stable
     * database assignments before rendering.
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
                dateToIso(
                    selectedFriday
                )
            );


    if (error) {

        console.error(
            "LOAD CLEANING COMPLETIONS ERROR:",
            error
        );


        currentCleaningCompletions =
            [];

        return;

    }


    currentCleaningCompletions =
        data ||
        [];

}


// ============================================================
// GET TASK FROM PLAN ITEM
// ============================================================

function getTaskFromPlanItem(
    planItem
) {

    if (!planItem) {

        return null;

    }


    return (
        planItem.cleaning_tasks ||
        null
    );

}


// ============================================================
// GET TASK ID FROM PLAN ITEM
// ============================================================

function getTaskIdFromPlanItem(
    planItem
) {

    const task =
        getTaskFromPlanItem(
            planItem
        );


    return (
        task?.id ||
        planItem?.task_id ||
        null
    );

}


// ============================================================
// FIND TASK COMPLETION
// ============================================================

function findTaskCompletion(
    taskId
) {

    if (!taskId) {

        return null;

    }


    return (
        currentCleaningCompletions.find(
            function (completion) {

                return (
                    completion.task_id ===
                    taskId
                );

            }
        ) ||
        null
    );

}


// ============================================================
// IS TASK COMPLETED
// ============================================================

function isTaskCompleted(
    taskId
) {

    return Boolean(
        findTaskCompletion(
            taskId
        )
    );

}


// ============================================================
// GET CURRENT RESIDENT ID
// ============================================================

function getCurrentResidentId() {

    return (
        currentResident?.id ||
        null
    );

}


// ============================================================
// GET SELECTED RESPONSIBLE RESIDENT ID
// ============================================================

function getSelectedResponsibleResidentId() {

    return getMemberResidentId(
        selectedResponsibleMember
    );

}


// ============================================================
// IS CURRENT USER RESPONSIBLE
// ============================================================

function isCurrentUserResponsible() {

    const currentResidentId =
        getCurrentResidentId();


    const responsibleResidentId =
        getSelectedResponsibleResidentId();


    if (
        !currentResidentId ||
        !responsibleResidentId
    ) {

        return false;

    }


    return (
        currentResidentId ===
        responsibleResidentId
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
        !isCurrentUserResponsible()
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
// SAVE TASK COMPLETION
// ============================================================

async function saveTaskCompletion(
    taskId
) {

    if (
        !taskId ||
        !currentCleaningPlan ||
        !currentResident ||
        !selectedFriday
    ) {

        return {

            success:
                false,

            data:
                null

        };

    }


    /*
     * Frontend permission check is only for UI behavior.
     *
     * Supabase RLS / can_complete_cleaning_task remains
     * the security authority.
     */

    if (
        !canCurrentUserComplete()
    ) {

        return {

            success:
                false,

            data:
                null

        };

    }


    const payload = {

        plan_id:
        currentCleaningPlan.id,

        task_id:
        taskId,

        resident_id:
        currentResident.id,

        week_start:
            dateToIso(
                selectedFriday
            )

    };


    const {
        data,
        error
    } =
        await supabaseClient
            .from(
                "cleaning_completions"
            )
            .insert(
                payload
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
            .single();


    if (error) {

        console.error(
            "SAVE TASK COMPLETION ERROR:",
            error
        );


        return {

            success:
                false,

            data:
                null

        };

    }


    currentCleaningCompletions =
        currentCleaningCompletions.filter(
            function (completion) {

                return (
                    completion.task_id !==
                    taskId
                );

            }
        );


    currentCleaningCompletions.push(
        data
    );


    return {

        success:
            true,

        data:
        data

    };

}


// ============================================================
// DELETE TASK COMPLETION
// ============================================================

async function deleteTaskCompletion(
    taskId
) {

    if (
        !taskId ||
        !currentCleaningPlan ||
        !currentResident ||
        !selectedFriday
    ) {

        return {

            success:
                false

        };

    }


    if (
        !canCurrentUserComplete()
    ) {

        return {

            success:
                false

        };

    }


    const existingCompletion =
        findTaskCompletion(
            taskId
        );


    if (!existingCompletion) {

        return {

            success:
                true

        };

    }


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
                existingCompletion.id
            );


    if (error) {

        console.error(
            "DELETE TASK COMPLETION ERROR:",
            error
        );


        return {

            success:
                false

        };

    }


    currentCleaningCompletions =
        currentCleaningCompletions.filter(
            function (completion) {

                return (
                    completion.id !==
                    existingCompletion.id
                );

            }
        );


    return {

        success:
            true

    };

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


    if (
        isSavingTaskCompletion
    ) {

        checkbox.checked =
            isTaskCompleted(
                taskId
            );

        return;

    }


    const previousCheckedState =
        isTaskCompleted(
            taskId
        );


    const wantedCheckedState =
        checkbox.checked;


    if (
        !canCurrentUserComplete()
    ) {

        checkbox.checked =
            previousCheckedState;

        updateConfirmButtonState();

        return;

    }


    isSavingTaskCompletion =
        true;


    checkbox.disabled =
        true;


    let result;


    if (
        wantedCheckedState
    ) {

        result =
            await saveTaskCompletion(
                taskId
            );

    }
    else {

        result =
            await deleteTaskCompletion(
                taskId
            );

    }


    if (
        !result ||
        !result.success
    ) {

        checkbox.checked =
            previousCheckedState;


        window.alert(
            wantedCheckedState
                ? t(
                    "couldNotSaveTaskCompletion"
                )
                : t(
                    "couldNotRemoveTaskCompletion"
                )
        );

    }
    else {

        checkbox.checked =
            wantedCheckedState;

    }


    isSavingTaskCompletion =
        false;


    checkbox.disabled =
        !canCurrentUserComplete();


    updateConfirmButtonState();

}


// ============================================================
// CREATE CLEANING TASK ITEM
// ============================================================

function createCleaningTaskItem(
    planItem,
    index
) {

    const task =
        getTaskFromPlanItem(
            planItem
        );


    if (!task) {

        return null;

    }


    const taskId =
        getTaskIdFromPlanItem(
            planItem
        );


    if (!taskId) {

        return null;

    }


    const item =
        document.createElement(
            "div"
        );


    item.className =
        "resident-cleaning-task-item";


    const checkboxWrapper =
        document.createElement(
            "label"
        );


    checkboxWrapper.className =
        "resident-cleaning-checkbox-wrapper";


    const checkbox =
        document.createElement(
            "input"
        );


    checkbox.type =
        "checkbox";

    checkbox.className =
        "resident-cleaning-checkbox";

    checkbox.dataset.taskId =
        taskId;


    checkbox.checked =
        isTaskCompleted(
            taskId
        );


    checkbox.disabled =
        !canCurrentUserComplete();


    const customCheckbox =
        document.createElement(
            "span"
        );


    customCheckbox.className =
        "resident-cleaning-checkbox-custom";


    checkboxWrapper.appendChild(
        checkbox
    );

    checkboxWrapper.appendChild(
        customCheckbox
    );


    const content =
        document.createElement(
            "div"
        );


    content.className =
        "resident-cleaning-task-content";


    const title =
        document.createElement(
            "strong"
        );


    title.className =
        "resident-cleaning-task-title";


    title.textContent =
        task.name ||
        "";


    content.appendChild(
        title
    );


    if (
        task.description
    ) {

        const description =
            document.createElement(
                "p"
            );


        description.className =
            "resident-cleaning-task-description";


        description.textContent =
            task.description;


        content.appendChild(
            description
        );

    }


    const number =
        document.createElement(
            "span"
        );


    number.className =
        "resident-cleaning-task-number";


    number.textContent =
        String(
            index +
            1
        );


    item.appendChild(
        checkboxWrapper
    );

    item.appendChild(
        content
    );

    item.appendChild(
        number
    );


    checkbox.addEventListener(
        "change",
        async function () {

            await handleTaskCheckboxChange(
                checkbox,
                taskId
            );

        }
    );


    return item;

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


    if (
        currentCleaningTasks.length ===
        0
    ) {

        if (cleaningTaskCount) {

            cleaningTaskCount.textContent =
                t(
                    "zeroTasks"
                );

        }


        if (noCleaningTasksState) {

            noCleaningTasksState.hidden =
                false;

        }


        if (cleaningTasksWrapper) {

            cleaningTasksWrapper.hidden =
                true;

        }


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


    if (cleaningTaskCount) {

        cleaningTaskCount.textContent =
            t(
                currentCleaningTasks.length ===
                1
                    ? "oneTask"
                    : "multipleTasks",
                {
                    count:
                    currentCleaningTasks
                        .length
                }
            );

    }


    currentCleaningTasks.forEach(
        function (
            planItem,
            index
        ) {

            const taskItem =
                createCleaningTaskItem(
                    planItem,
                    index
                );


            if (taskItem) {

                cleaningTaskList.appendChild(
                    taskItem
                );

            }

        }
    );

}


// ============================================================
// SET TASK CHECKBOXES DISABLED
// ============================================================

function setTaskCheckboxesDisabled(
    disabled
) {

    if (!cleaningTaskList) {

        return;

    }


    const checkboxes =
        cleaningTaskList
            .querySelectorAll(
                ".resident-cleaning-checkbox"
            );


    checkboxes.forEach(
        function (checkbox) {

            checkbox.disabled =
                disabled;

        }
    );

}


// ============================================================
// UPDATE COMPLETION CONTROLS
// ============================================================

function updateCompletionControls() {

    if (
        !currentCleaningPlan ||
        !selectedFriday
    ) {

        setTaskCheckboxesDisabled(
            true
        );


        if (confirmCleaningButton) {

            confirmCleaningButton.disabled =
                true;

        }


        return;

    }


    const responsibleName =
        getResponsibleNameForFriday(
            selectedFriday
        );


    const isResponsible =
        isCurrentUserResponsible();


    const isCurrentWeek =
        isSelectedCurrentWeek();


    const cleaningWindowState =
        getCleaningWindowState();


    // --------------------------------------------------------
    // NOT RESPONSIBLE
    // --------------------------------------------------------

    if (!isResponsible) {

        setTaskCheckboxesDisabled(
            true
        );


        if (taskPermissionMessage) {

            taskPermissionMessage.textContent =
                t(
                    "tasksVisibleOnlyResponsibleCanComplete"
                );

        }


        if (cleaningPermissionNotice) {

            cleaningPermissionNotice.hidden =
                false;

        }


        if (cleaningPermissionText) {

            cleaningPermissionText.textContent =
                t(
                    "onlyNameCanComplete",
                    {
                        name:
                        responsibleName
                    }
                );

        }


        if (responsibleOnlyMessage) {

            responsibleOnlyMessage.textContent =
                t(
                    "onlyResponsibleCanConfirm"
                );

        }


        if (confirmCleaningButton) {

            confirmCleaningButton.disabled =
                true;

        }


        return;

    }


    // --------------------------------------------------------
    // RESPONSIBLE, BUT NOT SELECTED CURRENT WEEK
    // --------------------------------------------------------

    if (!isCurrentWeek) {

        setTaskCheckboxesDisabled(
            true
        );


        if (taskPermissionMessage) {

            taskPermissionMessage.textContent =
                t(
                    "notActiveCleaningWeek"
                );

        }


        if (cleaningPermissionNotice) {

            cleaningPermissionNotice.hidden =
                false;

        }


        if (cleaningPermissionText) {

            cleaningPermissionText.textContent =
                t(
                    "tasksOnlyCurrentWeek"
                );

        }


        if (responsibleOnlyMessage) {

            responsibleOnlyMessage.textContent =
                t(
                    "selectCurrentWeekToClean"
                );

        }


        if (confirmCleaningButton) {

            confirmCleaningButton.disabled =
                true;

        }


        return;

    }


    // --------------------------------------------------------
    // RESPONSIBLE, CURRENT WEEK, BEFORE THURSDAY
    // --------------------------------------------------------

    if (
        cleaningWindowState ===
        "not-open-yet"
    ) {

        setTaskCheckboxesDisabled(
            true
        );


        if (taskPermissionMessage) {

            taskPermissionMessage.textContent =
                t(
                    "cleaningAvailableThursday"
                );

        }


        if (cleaningPermissionNotice) {

            cleaningPermissionNotice.hidden =
                false;

        }


        if (cleaningPermissionText) {

            cleaningPermissionText.textContent =
                t(
                    "notAvailableThursdayFriday"
                );

        }


        if (responsibleOnlyMessage) {

            responsibleOnlyMessage.textContent =
                t(
                    "confirmationOpensThursday"
                );

        }


        if (confirmCleaningButton) {

            confirmCleaningButton.disabled =
                true;

        }


        return;

    }


    // --------------------------------------------------------
    // RESPONSIBLE, CURRENT WEEK, DEADLINE PASSED
    // --------------------------------------------------------

    if (
        cleaningWindowState ===
        "deadline-passed"
    ) {

        setTaskCheckboxesDisabled(
            true
        );


        if (taskPermissionMessage) {

            taskPermissionMessage.textContent =
                t(
                    "deadlineExpiredForWeek"
                );

        }


        if (cleaningPermissionNotice) {

            cleaningPermissionNotice.hidden =
                false;

        }


        if (cleaningPermissionText) {

            cleaningPermissionText.textContent =
                t(
                    "cleaningCannotBeRegistered"
                );

        }


        if (responsibleOnlyMessage) {

            responsibleOnlyMessage.textContent =
                t(
                    "deadlineExpiredLocked"
                );

        }


        if (confirmCleaningButton) {

            confirmCleaningButton.disabled =
                true;

        }


        return;

    }


    // --------------------------------------------------------
    // RESPONSIBLE + CURRENT WEEK + THURSDAY/FRIDAY
    // --------------------------------------------------------

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
// RESET SELECTED PHOTOS
// ============================================================

function resetSelectedPhotos() {

    selectedPhotos =
        [];


    renderPhotoPreviews();

}


// ============================================================
// ADD CAMERA PHOTO
// ============================================================

function addCameraPhoto(
    fileList
) {

    if (
        !fileList ||
        fileList.length ===
        0
    ) {

        return;

    }


    const file =
        fileList[0];


    if (
        !file ||
        !file.type ||
        !file.type.startsWith(
            "image/"
        )
    ) {

        return;

    }


    if (
        selectedPhotos.length >=
        MAX_PHOTOS
    ) {

        window.alert(
            t(
                "maxSixPhotosAlert"
            )
        );


        return;

    }


    selectedPhotos.push(
        file
    );


    renderPhotoPreviews();

}


// ============================================================
// CAMERA BUTTON
// ============================================================

if (cameraButton) {

    cameraButton.addEventListener(
        "click",
        function () {

            if (
                cameraButton.disabled
            ) {

                return;

            }


            if (
                selectedPhotos.length >=
                MAX_PHOTOS
            ) {

                window.alert(
                    t(
                        "maxSixPhotosAlert"
                    )
                );


                return;

            }


            if (cameraInput) {

                cameraInput.click();

            }

        }
    );

}


// ============================================================
// CAMERA FILE CHANGE
// ============================================================

if (cameraInput) {

    cameraInput.addEventListener(
        "change",
        function () {

            addCameraPhoto(
                cameraInput.files
            );


            cameraInput.value =
                "";

        }
    );

}


// ============================================================
// RENDER PHOTO PREVIEWS
// ============================================================

function renderPhotoPreviews() {

    if (photoPreviewGrid) {

        photoPreviewGrid.innerHTML =
            "";

    }


    if (photoCount) {

        photoCount.textContent =
            t(
                "photosCount",
                {
                    count:
                    selectedPhotos.length
                }
            );

    }


    selectedPhotos.forEach(
        function (
            file,
            index
        ) {

            const wrapper =
                document.createElement(
                    "div"
                );


            wrapper.className =
                "resident-photo-preview";


            const image =
                document.createElement(
                    "img"
                );


            const objectUrl =
                URL.createObjectURL(
                    file
                );


            image.src =
                objectUrl;


            image.alt =
                t(
                    "documentationPhotoAlt"
                );


            image.addEventListener(
                "load",
                function () {

                    URL.revokeObjectURL(
                        objectUrl
                    );

                }
            );


            const removeButton =
                document.createElement(
                    "button"
                );


            removeButton.type =
                "button";


            removeButton.className =
                "resident-photo-remove";


            removeButton.textContent =
                "×";


            removeButton.setAttribute(
                "aria-label",
                t(
                    "removePhotoAria"
                )
            );


            removeButton.addEventListener(
                "click",
                function () {

                    selectedPhotos.splice(
                        index,
                        1
                    );


                    renderPhotoPreviews();

                }
            );


            wrapper.appendChild(
                image
            );


            wrapper.appendChild(
                removeButton
            );


            if (photoPreviewGrid) {

                photoPreviewGrid.appendChild(
                    wrapper
                );

            }

        }
    );


    if (cameraButton) {

        cameraButton.textContent =
            selectedPhotos.length >=
            MAX_PHOTOS
                ? t(
                    "maxPhotosTaken"
                )
                : t(
                    "takePhotoWithIcon"
                );


        cameraButton.disabled =
            (
                !canCurrentUserComplete() ||
                selectedPhotos.length >=
                MAX_PHOTOS
            );

    }


    updateConfirmButtonState();

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
// HAS REQUIRED PHOTO
// ============================================================

function hasRequiredPhoto() {

    return (
        selectedPhotos.length >
        0
    );

}


// ============================================================
// UPDATE CONFIRM BUTTON STATE
// ============================================================

function updateConfirmButtonState() {

    if (!confirmCleaningButton) {

        return;

    }


    if (
        !canCurrentUserComplete()
    ) {

        confirmCleaningButton.disabled =
            true;


        return;

    }


    const allTasksCompleted =
        areAllTasksCompleted();


    const hasPhoto =
        hasRequiredPhoto();


    confirmCleaningButton.disabled =
        !(
            allTasksCompleted &&
            hasPhoto
        );

}


// ============================================================
// CONFIRM CLEANING
// ============================================================

if (confirmCleaningButton) {

    confirmCleaningButton.addEventListener(
        "click",
        function () {

            if (
                confirmCleaningButton.disabled
            ) {

                return;

            }


            /*
             * Supabase Storage and secure final signing
             * will be connected in the next database step.
             *
             * Nothing is marked finally signed only
             * in the browser.
             */

            window.alert(
                t(
                    "completionReadyForSupabase"
                )
            );

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
     * First translate all static HTML elements
     * that use data-i18n attributes.
     */

    if (
        window.CleanPlanI18n &&
        typeof window.CleanPlanI18n
            .applyTranslations ===
        "function"
    ) {

        window.CleanPlanI18n
            .applyTranslations();

    }


    /*
     * Then rerender dynamic JavaScript content.
     */

    refreshProfileLanguage();

    refreshPropertyLanguage();

    refreshCleaningLanguage();

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
// SHOW WAITING STATE
// ============================================================

function showWaitingState() {

    if (loadingSection) {

        loadingSection.hidden =
            true;

    }


    hideContentSections();


    if (waitingSection) {

        waitingSection.hidden =
            false;

    }

}


// ============================================================
// SHOW PAGE ERROR
// ============================================================

function showPageError(
    message
) {

    if (loadingSection) {

        loadingSection.hidden =
            true;

    }


    hideContentSections();


    if (residentPageMessage) {

        residentPageMessage.textContent =
            message ||
            t(
                "errorOccurred"
            );

    }


    if (errorSection) {

        errorSection.hidden =
            false;

    }

}

// ============================================================
// INITIALIZE RESIDENT PAGE
// ============================================================

async function initResidentPage() {

    hideContentSections();


    if (loadingSection) {

        loadingSection.hidden =
            false;

    }


    /*
     * Make sure the static translations are applied first.
     */

    if (
        window.CleanPlanI18n &&
        typeof window.CleanPlanI18n
            .applyTranslations ===
        "function"
    ) {

        window.CleanPlanI18n
            .applyTranslations();

    }


    const accessResult =
        await checkResidentAccess();


    if (!accessResult) {

        return;

    }


    const associationResult =
        await loadResidentAssociation(
            accessResult.profile.id
        );


    if (
        !associationResult ||
        !associationResult.success
    ) {

        return;

    }


    if (
        !associationResult.resident
    ) {

        return;

    }


    await loadCleaningPlan();


    refreshResidentLanguage();

}


// ============================================================
// START PAGE
// ============================================================

if (
    document.readyState ===
    "loading"
) {

    document.addEventListener(
        "DOMContentLoaded",
        function () {

            initResidentPage();

        }
    );

}
else {

    initResidentPage();

}