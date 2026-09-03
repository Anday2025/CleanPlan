// ============================================================
// CLEANING APP
// ADMIN CLEANING PLAN
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

const adminName =
    document.getElementById(
        "adminName"
    );

const propertySelect =
    document.getElementById(
        "propertySelect"
    );

const floorSelect =
    document.getElementById(
        "floorSelect"
    );

const taskManagementSection =
    document.getElementById(
        "taskManagementSection"
    );

const selectedLocationText =
    document.getElementById(
        "selectedLocationText"
    );

const taskForm =
    document.getElementById(
        "taskForm"
    );

const taskFormTitle =
    document.getElementById(
        "taskFormTitle"
    );

const taskName =
    document.getElementById(
        "taskName"
    );

const taskDescription =
    document.getElementById(
        "taskDescription"
    );

const taskOrder =
    document.getElementById(
        "taskOrder"
    );

const saveTaskButton =
    document.getElementById(
        "saveTaskButton"
    );

const cancelEditButton =
    document.getElementById(
        "cancelEditButton"
    );

const taskMessage =
    document.getElementById(
        "taskMessage"
    );

const taskList =
    document.getElementById(
        "taskList"
    );

const taskCount =
    document.getElementById(
        "taskCount"
    );

const taskEmptyState =
    document.getElementById(
        "taskEmptyState"
    );

const taskTableWrapper =
    document.getElementById(
        "taskTableWrapper"
    );


// ============================================================
// STATE
// ============================================================

let currentProfile =
    null;

let properties =
    [];

let floors =
    [];

let currentPlan =
    null;

let currentTasks =
    [];

let editingTaskId =
    null;


// ============================================================
// DRAG AND DROP STATE
// ============================================================

let draggedTaskId =
    null;

let isSavingTaskOrder =
    false;


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

function showTaskMessage(
    message,
    type = ""
) {

    if (!taskMessage) {

        return;

    }


    taskMessage.textContent =
        message;


    taskMessage.className =
        "message " + type;

}


// ============================================================
// CHECK ADMIN ACCESS
// ============================================================

async function checkAdminAccess() {

    const {
        data: {
            session
        },
        error: sessionError
    } =
        await supabaseClient.auth.getSession();


    if (
        sessionError ||
        !session
    ) {

        window.location.href =
            "index.html";

        return false;

    }


    const {
        data: profile,
        error: profileError
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
        profileError ||
        !profile
    ) {

        console.error(
            profileError
        );


        await supabaseClient.auth.signOut();


        window.location.href =
            "index.html";


        return false;

    }


    if (
        !profile.is_active ||
        (
            profile.role !==
            "admin" &&
            profile.role !==
            "superadmin"
        )
    ) {

        await supabaseClient.auth.signOut();


        window.location.href =
            "index.html";


        return false;

    }


    currentProfile =
        profile;


    if (adminName) {

        adminName.textContent =
            profile.full_name;

    }


    return true;

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
            .from(
                "properties"
            )
            .select(
                "id, name, address, is_active"
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

        return;

    }


    properties =
        data || [];


    renderProperties();

}


// ============================================================
// RENDER PROPERTIES
// ============================================================

function renderProperties() {

    if (!propertySelect) {

        return;

    }


    propertySelect.innerHTML =
        `
            <option value="">
                Velg bolig
            </option>
        `;


    properties.forEach(
        function (property) {

            const option =
                document.createElement(
                    "option"
                );


            option.value =
                property.id;


            option.textContent =
                property.name;


            propertySelect.appendChild(
                option
            );

        }
    );

}


// ============================================================
// LOAD FLOORS
// ============================================================

async function loadFloors(
    propertyId
) {

    floors =
        [];

    currentPlan =
        null;

    currentTasks =
        [];


    if (floorSelect) {

        floorSelect.innerHTML =
            `
                <option value="">
                    Velg etasje
                </option>
            `;


        floorSelect.disabled =
            true;

    }


    if (taskManagementSection) {

        taskManagementSection.hidden =
            true;

    }


    if (!propertyId) {

        return;

    }


    const {
        data,
        error
    } =
        await supabaseClient
            .from(
                "floors"
            )
            .select(
                "id, property_id, floor_number, name"
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

        return;

    }


    floors =
        data || [];


    floors.forEach(
        function (floor) {

            const option =
                document.createElement(
                    "option"
                );


            option.value =
                floor.id;


            option.textContent =
                floor.name ||
                floor.floor_number;


            floorSelect.appendChild(
                option
            );

        }
    );


    floorSelect.disabled =
        false;

}


// ============================================================
// GET SELECTED PROPERTY
// ============================================================

function getSelectedProperty() {

    return properties.find(
        function (property) {

            return (
                property.id ===
                propertySelect.value
            );

        }
    );

}


// ============================================================
// GET SELECTED FLOOR
// ============================================================

function getSelectedFloor() {

    return floors.find(
        function (floor) {

            return (
                floor.id ===
                floorSelect.value
            );

        }
    );

}


// ============================================================
// GET CURRENT WEEK FRIDAY
// ============================================================

function getCurrentWeekFriday() {

    const now =
        new Date();


    const date =
        new Date(
            now.getFullYear(),
            now.getMonth(),
            now.getDate()
        );


    const day =
        date.getDay();


    const daysUntilFriday =
        (
            5 -
            day +
            7
        ) % 7;


    date.setDate(
        date.getDate() +
        daysUntilFriday
    );


    const year =
        date.getFullYear();


    const month =
        String(
            date.getMonth() + 1
        ).padStart(
            2,
            "0"
        );


    const dayOfMonth =
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
        dayOfMonth
    );

}


// ============================================================
// LOAD OR CREATE CLEANING PLAN
// ============================================================

async function getOrCreatePlan() {

    const property =
        getSelectedProperty();

    const floor =
        getSelectedFloor();


    if (
        !property ||
        !floor
    ) {

        return null;

    }


    // ========================================================
    // LOOK FOR EXISTING PLAN
    // ========================================================

    const {
        data: existingPlan,
        error: planError
    } =
        await supabaseClient
            .from(
                "cleaning_plans"
            )
            .select(
                "id, property_id, floor_id, name, start_date, is_active"
            )
            .eq(
                "property_id",
                property.id
            )
            .eq(
                "floor_id",
                floor.id
            )
            .maybeSingle();


    if (planError) {

        console.error(
            "LOAD PLAN ERROR:",
            planError
        );


        showTaskMessage(
            "Kunne ikke hente rengjøringsplanen.",
            "error"
        );


        return null;

    }


    if (existingPlan) {

        currentPlan =
            existingPlan;


        return existingPlan;

    }


    // ========================================================
    // CREATE NEW PLAN
    // ========================================================

    const floorLabel =
        floor.name ||
        floor.floor_number;


    const {
        data: newPlan,
        error: createError
    } =
        await supabaseClient
            .from(
                "cleaning_plans"
            )
            .insert({

                property_id:
                property.id,

                floor_id:
                floor.id,

                name:
                    property.name +
                    " - " +
                    floorLabel,

                start_date:
                    getCurrentWeekFriday(),

                is_active:
                    true

            })
            .select(
                "id, property_id, floor_id, name, start_date, is_active"
            )
            .single();


    if (createError) {

        console.error(
            "CREATE PLAN ERROR:",
            createError
        );


        showTaskMessage(
            "Kunne ikke opprette rengjøringsplanen.",
            "error"
        );


        return null;

    }


    currentPlan =
        newPlan;


    return newPlan;

}


// ============================================================
// LOAD PLAN WITHOUT CREATING
// ============================================================

async function loadCurrentPlan() {

    const property =
        getSelectedProperty();

    const floor =
        getSelectedFloor();


    if (
        !property ||
        !floor
    ) {

        currentPlan =
            null;

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
                "id, property_id, floor_id, name, start_date, is_active"
            )
            .eq(
                "property_id",
                property.id
            )
            .eq(
                "floor_id",
                floor.id
            )
            .maybeSingle();


    if (error) {

        console.error(
            "LOAD CURRENT PLAN ERROR:",
            error
        );


        currentPlan =
            null;


        return;

    }


    currentPlan =
        data || null;

}


// ============================================================
// LOAD TASKS
// ============================================================

async function loadTasks() {

    currentTasks =
        [];


    await loadCurrentPlan();


    if (!currentPlan) {

        renderTasks();

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
            .select(`
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
            `)
            .eq(
                "plan_id",
                currentPlan.id
            )
            .order(
                "sort_order",
                {
                    ascending: true
                }
            );


    if (error) {

        console.error(
            "LOAD TASKS ERROR:",
            error
        );


        showTaskMessage(
            "Kunne ikke hente oppgavene.",
            "error"
        );


        return;

    }


    currentTasks =
        (data || [])
            .filter(
                function (item) {

                    return (
                        item.cleaning_tasks &&
                        item.cleaning_tasks.is_active
                    );

                }
            );


    renderTasks();

}


// ============================================================
// RENDER TASKS
// ============================================================

function renderTasks() {

    if (!taskList) {

        return;

    }


    taskList.innerHTML =
        "";


    if (taskCount) {

        taskCount.textContent =
            currentTasks.length;

    }


    // ========================================================
    // NO TASKS
    // ========================================================

    if (
        currentTasks.length ===
        0
    ) {

        if (taskEmptyState) {

            taskEmptyState.hidden =
                false;

        }


        if (taskTableWrapper) {

            taskTableWrapper.hidden =
                true;

        }


        updateNextOrder();

        return;

    }


    // ========================================================
    // TASKS FOUND
    // ========================================================

    if (taskEmptyState) {

        taskEmptyState.hidden =
            true;

    }


    if (taskTableWrapper) {

        taskTableWrapper.hidden =
            false;

    }


    // ========================================================
    // SORT TASKS
    // ========================================================

    currentTasks.sort(
        function (a, b) {

            return (
                a.sort_order -
                b.sort_order
            );

        }
    );


    // ========================================================
    // CREATE ROWS
    // ========================================================

    currentTasks.forEach(
        function (
            item,
            index
        ) {

            const task =
                item.cleaning_tasks;


            if (!task) {

                return;

            }


            const row =
                document.createElement(
                    "tr"
                );


            row.dataset.itemId =
                item.id;


            row.className =
                "admin-cleaning-sortable-row";


            // =================================================
            // DRAG COLUMN
            // =================================================

            const dragCell =
                document.createElement(
                    "td"
                );


            dragCell.className =
                "admin-cleaning-drag-cell";


            const dragHandle =
                document.createElement(
                    "button"
                );


            dragHandle.type =
                "button";


            dragHandle.className =
                "admin-cleaning-drag-handle";


            dragHandle.textContent =
                "⋮⋮";


            dragHandle.title =
                "Dra for å endre rekkefølgen";


            dragHandle.setAttribute(
                "aria-label",
                "Dra oppgaven for å endre rekkefølgen"
            );


            /*
                Håndtaket starter drag-operasjonen.

                Selve raden flyttes i tabellen.
                Hele raden brukes også som drag-bilde.
            */

            dragHandle.draggable =
                true;


            // =================================================
            // DRAG START
            // =================================================

            dragHandle.addEventListener(
                "dragstart",
                function (event) {

                    if (isSavingTaskOrder) {

                        event.preventDefault();

                        return;

                    }


                    draggedTaskId =
                        item.id;


                    row.classList.add(
                        "dragging"
                    );


                    if (event.dataTransfer) {

                        event.dataTransfer.effectAllowed =
                            "move";


                        event.dataTransfer.setData(
                            "text/plain",
                            item.id
                        );


                        /*
                            Selv om drag starter fra ⋮⋮,
                            skal hele raden vises mens vi drar.
                        */

                        try {

                            event.dataTransfer.setDragImage(
                                row,
                                30,
                                Math.max(
                                    1,
                                    row.offsetHeight / 2
                                )
                            );

                        }
                        catch (error) {

                            console.warn(
                                "Kunne ikke sette drag-bilde:",
                                error
                            );

                        }

                    }

                }
            );


            // =================================================
            // DRAG END
            // =================================================

            dragHandle.addEventListener(
                "dragend",
                async function () {

                    row.classList.remove(
                        "dragging"
                    );


                    clearDragOverStates();


                    /*
                        Raden har allerede blitt flyttet i DOM-en
                        av dragover.

                        Nå lagrer vi den faktiske rekkefølgen.
                    */

                    await saveTaskOrderFromTable();

                }
            );


            dragCell.appendChild(
                dragHandle
            );


            row.appendChild(
                dragCell
            );


            // =================================================
            // ORDER NUMBER
            // =================================================

            const orderCell =
                document.createElement(
                    "td"
                );


            orderCell.className =
                "admin-cleaning-order-cell";


            orderCell.textContent =
                index + 1;


            row.appendChild(
                orderCell
            );


            // =================================================
            // TASK
            // =================================================

            const taskCell =
                document.createElement(
                    "td"
                );


            taskCell.className =
                "admin-cleaning-task-cell";


            const taskTitle =
                document.createElement(
                    "strong"
                );


            taskTitle.textContent =
                task.name;


            taskCell.appendChild(
                taskTitle
            );


            if (task.description) {

                const description =
                    document.createElement(
                        "div"
                    );


                description.className =
                    "cleaning-task-description";


                description.textContent =
                    task.description;


                taskCell.appendChild(
                    description
                );

            }


            row.appendChild(
                taskCell
            );


            // =================================================
            // ACTIONS
            // =================================================

            const actionCell =
                document.createElement(
                    "td"
                );


            actionCell.className =
                "admin-cleaning-actions-cell";


            const actionWrapper =
                document.createElement(
                    "div"
                );


            actionWrapper.className =
                "table-actions";


            // =================================================
            // EDIT BUTTON
            // =================================================

            const editButton =
                document.createElement(
                    "button"
                );


            editButton.type =
                "button";


            editButton.className =
                "edit-button";


            editButton.textContent =
                "✏️ Rediger";


            editButton.addEventListener(
                "click",
                function () {

                    startEditTask(
                        item
                    );

                }
            );


            // =================================================
            // DELETE BUTTON
            // =================================================

            const deleteButton =
                document.createElement(
                    "button"
                );


            deleteButton.type =
                "button";


            deleteButton.className =
                "delete-button";


            deleteButton.textContent =
                "🗑 Slett";


            deleteButton.addEventListener(
                "click",
                function () {

                    deleteTask(
                        item
                    );

                }
            );


            actionWrapper.appendChild(
                editButton
            );


            actionWrapper.appendChild(
                deleteButton
            );


            actionCell.appendChild(
                actionWrapper
            );


            row.appendChild(
                actionCell
            );


            // =================================================
            // DRAG OVER
            // =================================================

            row.addEventListener(
                "dragover",
                function (event) {

                    if (
                        !draggedTaskId ||
                        draggedTaskId ===
                        item.id ||
                        isSavingTaskOrder
                    ) {

                        return;

                    }


                    /*
                        preventDefault() er nødvendig for at
                        nettleseren skal tillate dropping her.
                    */

                    event.preventDefault();


                    if (event.dataTransfer) {

                        event.dataTransfer.dropEffect =
                            "move";

                    }


                    // =========================================
                    // FIND DRAGGED ROW
                    // =========================================

                    const draggedRow =
                        Array
                            .from(
                                taskList.querySelectorAll(
                                    ".admin-cleaning-sortable-row"
                                )
                            )
                            .find(
                                function (currentRow) {

                                    return (
                                        currentRow.dataset.itemId ===
                                        draggedTaskId
                                    );

                                }
                            );


                    if (!draggedRow) {

                        return;

                    }


                    const rectangle =
                        row.getBoundingClientRect();


                    const middle =
                        rectangle.top +
                        (
                            rectangle.height /
                            2
                        );


                    // =========================================
                    // MOVE ABOVE TARGET
                    // =========================================

                    if (
                        event.clientY <
                        middle
                    ) {

                        if (
                            row.previousElementSibling !==
                            draggedRow
                        ) {

                            taskList.insertBefore(
                                draggedRow,
                                row
                            );

                        }

                    }


                        // =========================================
                        // MOVE BELOW TARGET
                    // =========================================

                    else {

                        if (
                            row.nextElementSibling !==
                            draggedRow
                        ) {

                            taskList.insertBefore(
                                draggedRow,
                                row.nextElementSibling
                            );

                        }

                    }


                    /*
                        Oppdater tallene med én gang.

                        Hvis oppgave 9 flyttes til plass 2,
                        skal skjermen vise 1,2,3... direkte.
                    */

                    updateVisibleTaskNumbers();

                }
            );


            // =================================================
            // DROP
            // =================================================

            row.addEventListener(
                "drop",
                function (event) {

                    /*
                        Ikke lagre her.

                        dragend lagrer rekkefølgen én gang
                        når brukeren slipper oppgaven.
                    */

                    event.preventDefault();

                }
            );


            // =================================================
            // ADD ROW
            // =================================================

            taskList.appendChild(
                row
            );

        }
    );


    updateNextOrder();

}


// ============================================================
// UPDATE VISIBLE TASK NUMBERS
// ============================================================

function updateVisibleTaskNumbers() {

    if (!taskList) {

        return;

    }


    const rows =
        taskList.querySelectorAll(
            ".admin-cleaning-sortable-row"
        );


    rows.forEach(
        function (
            row,
            index
        ) {

            const numberCell =
                row.querySelector(
                    ".admin-cleaning-order-cell"
                );


            if (numberCell) {

                numberCell.textContent =
                    index + 1;

            }

        }
    );

}


// ============================================================
// CLEAR DRAG STATES
// ============================================================

function clearDragOverStates() {

    if (!taskList) {

        return;

    }


    taskList
        .querySelectorAll(
            ".admin-cleaning-sortable-row"
        )
        .forEach(
            function (row) {

                row.classList.remove(
                    "drag-over-top",
                    "drag-over-bottom"
                );

            }
        );

}


// ============================================================
// SAVE ORDER FROM TABLE
// ============================================================

async function saveTaskOrderFromTable() {

    if (
        !taskList ||
        isSavingTaskOrder
    ) {

        return;

    }


    const rows =
        Array.from(
            taskList.querySelectorAll(
                ".admin-cleaning-sortable-row"
            )
        );


    if (
        rows.length ===
        0
    ) {

        draggedTaskId =
            null;

        return;

    }


    // ========================================================
    // BUILD ORDER FROM CURRENT DOM
    // ========================================================

    const orderedItems =
        [];


    for (
        let index = 0;
        index < rows.length;
        index++
    ) {

        const itemId =
            rows[index].dataset.itemId;


        const item =
            currentTasks.find(
                function (currentItem) {

                    return (
                        currentItem.id ===
                        itemId
                    );

                }
            );


        if (!item) {

            continue;

        }


        orderedItems.push({

            ...item,

            sort_order:
                index + 1

        });

    }


    if (
        orderedItems.length !==
        currentTasks.length
    ) {

        console.error(
            "TASK ORDER ERROR: Kunne ikke finne alle oppgavene."
        );


        draggedTaskId =
            null;


        await loadTasks();


        return;

    }


    // ========================================================
    // CHECK IF ORDER CHANGED
    // ========================================================

    const oldOrder =
        [...currentTasks]
            .sort(
                function (a, b) {

                    return (
                        a.sort_order -
                        b.sort_order
                    );

                }
            )
            .map(
                function (item) {

                    return item.id;

                }
            );


    const newOrder =
        orderedItems.map(
            function (item) {

                return item.id;

            }
        );


    const changed =
        newOrder.some(
            function (
                itemId,
                index
            ) {

                return (
                    itemId !==
                    oldOrder[index]
                );

            }
        );


    draggedTaskId =
        null;


    if (!changed) {

        updateVisibleTaskNumbers();

        return;

    }


    // ========================================================
    // SAVE
    // ========================================================

    isSavingTaskOrder =
        true;


    showTaskMessage(
        "Lagrer ny rekkefølge...",
        "info"
    );


    const saved =
        await saveDraggedTaskOrder(
            orderedItems
        );


    isSavingTaskOrder =
        false;


    if (!saved) {

        showTaskMessage(
            "Kunne ikke lagre den nye rekkefølgen.",
            "error"
        );


        await loadTasks();


        return;

    }


    currentTasks =
        orderedItems;


    showTaskMessage(
        "Rekkefølgen ble lagret.",
        "success"
    );


    await loadTasks();

}


// ============================================================
// SAVE DRAGGED TASK ORDER
// ============================================================

async function saveDraggedTaskOrder(
    orderedItems
) {

    if (
        !orderedItems ||
        orderedItems.length ===
        0
    ) {

        return true;

    }


    // ========================================================
    // STEP 1
    // TEMPORARY SORT ORDERS
    //
    // cleaning_plan_items has unique:
    // plan_id + sort_order
    //
    // Therefore all rows are moved temporarily first.
    // ========================================================

    for (
        let index = 0;
        index < orderedItems.length;
        index++
    ) {

        const item =
            orderedItems[index];


        const temporaryOrder =
            1000000 +
            index;


        const {
            error
        } =
            await supabaseClient
                .from(
                    "cleaning_plan_items"
                )
                .update({

                    sort_order:
                    temporaryOrder

                })
                .eq(
                    "id",
                    item.id
                );


        if (error) {

            console.error(
                "TEMPORARY TASK ORDER ERROR:",
                error
            );


            return false;

        }

    }


    // ========================================================
    // STEP 2
    // SAVE FINAL PLAN ORDER
    // ========================================================

    for (
        let index = 0;
        index < orderedItems.length;
        index++
    ) {

        const item =
            orderedItems[index];


        const newOrder =
            index + 1;


        const {
            error
        } =
            await supabaseClient
                .from(
                    "cleaning_plan_items"
                )
                .update({

                    sort_order:
                    newOrder

                })
                .eq(
                    "id",
                    item.id
                );


        if (error) {

            console.error(
                "SAVE TASK ORDER ERROR:",
                error
            );


            return false;

        }

    }


    // ========================================================
    // STEP 3
    // KEEP CLEANING_TASKS SORT_ORDER SYNCHRONIZED
    // ========================================================

    for (
        let index = 0;
        index < orderedItems.length;
        index++
    ) {

        const item =
            orderedItems[index];


        const newOrder =
            index + 1;


        const {
            error
        } =
            await supabaseClient
                .from(
                    "cleaning_tasks"
                )
                .update({

                    sort_order:
                    newOrder,

                    updated_at:
                        new Date()
                            .toISOString()

                })
                .eq(
                    "id",
                    item.task_id
                );


        if (error) {

            console.error(
                "SAVE CLEANING TASK ORDER ERROR:",
                error
            );


            return false;

        }

    }


    return true;

}


// ============================================================
// NEXT ORDER
// ============================================================

function updateNextOrder() {

    if (
        editingTaskId ||
        !taskOrder
    ) {

        return;

    }


    if (
        currentTasks.length ===
        0
    ) {

        taskOrder.value =
            1;

        return;

    }


    const largestOrder =
        Math.max(
            ...currentTasks.map(
                function (item) {

                    return item.sort_order;

                }
            )
        );


    taskOrder.value =
        largestOrder + 1;

}


// ============================================================
// RESET FORM
// ============================================================

function resetTaskForm() {

    editingTaskId =
        null;


    if (taskForm) {

        taskForm.reset();

    }


    if (taskFormTitle) {

        taskFormTitle.textContent =
            "Legg til ny oppgave";

    }


    if (saveTaskButton) {

        saveTaskButton.textContent =
            "+ Legg til oppgave";

    }


    if (cancelEditButton) {

        cancelEditButton.hidden =
            true;

    }


    updateNextOrder();

}



// ============================================================
// EDIT TASK
// ============================================================

function startEditTask(
    item
) {

    const task =
        item.cleaning_tasks;


    if (!task) {

        return;

    }


    editingTaskId =
        task.id;


    if (taskName) {

        taskName.value =
            task.name || "";

    }


    if (taskDescription) {

        taskDescription.value =
            task.description || "";

    }


    if (taskOrder) {

        taskOrder.value =
            item.sort_order;

    }


    if (taskFormTitle) {

        taskFormTitle.textContent =
            "Rediger oppgave";

    }


    if (saveTaskButton) {

        saveTaskButton.textContent =
            "Lagre endringer";

    }


    if (cancelEditButton) {

        cancelEditButton.hidden =
            false;

    }


    showTaskMessage(
        ""
    );


    if (taskName) {

        taskName.focus();

    }

}


// ============================================================
// CANCEL EDIT
// ============================================================

if (cancelEditButton) {

    cancelEditButton.addEventListener(
        "click",
        function () {

            resetTaskForm();


            showTaskMessage(
                ""
            );

        }
    );

}


// ============================================================
// SAVE TASK
// ============================================================

if (taskForm) {

    taskForm.addEventListener(
        "submit",
        async function (event) {

            event.preventDefault();


            const property =
                getSelectedProperty();

            const floor =
                getSelectedFloor();


            if (
                !property ||
                !floor
            ) {

                showTaskMessage(
                    "Velg bolig og etasje først.",
                    "error"
                );


                return;

            }


            const name =
                taskName.value.trim();

            const description =
                taskDescription.value.trim();

            const order =
                Number(
                    taskOrder.value
                );


            if (!name) {

                showTaskMessage(
                    "Skriv inn en oppgave.",
                    "error"
                );


                return;

            }


            if (
                !Number.isInteger(order) ||
                order < 1
            ) {

                showTaskMessage(
                    "Rekkefølgen må være 1 eller høyere.",
                    "error"
                );


                return;

            }


            if (saveTaskButton) {

                saveTaskButton.disabled =
                    true;

            }


            try {


                // =================================================
                // EDIT EXISTING TASK
                // =================================================

                if (editingTaskId) {

                    await updateTask(
                        editingTaskId,
                        name,
                        description,
                        order
                    );

                }


                    // =================================================
                    // CREATE NEW TASK
                // =================================================

                else {

                    await createTask(
                        property,
                        floor,
                        name,
                        description,
                        order
                    );

                }


            }
            finally {

                if (saveTaskButton) {

                    saveTaskButton.disabled =
                        false;

                }

            }

        }
    );

}



// ============================================================
// TRANSLATE CLEANING TEXT
// ============================================================

async function translateCleaningText(
    texts,
    targetLanguage
) {

    const cleanedTexts =
        texts.map(
            function (text) {

                return (
                    typeof text === "string"
                        ? text.trim()
                        : ""
                );

            }
        );


    const {
        data,
        error
    } =
        await supabaseClient
            .functions
            .invoke(
                "translate-cleaning-text",
                {
                    body: {

                        texts:
                        cleanedTexts,

                        target:
                        targetLanguage

                    }
                }
            );


    if (error) {

        console.error(
            "TRANSLATION FUNCTION ERROR:",
            error
        );

        throw new Error(
            "Kunne ikke oversette rengjøringsoppgaven."
        );

    }


    if (
        !data ||
        !Array.isArray(
            data.translations
        )
    ) {

        console.error(
            "INVALID TRANSLATION RESPONSE:",
            data
        );

        throw new Error(
            "Ugyldig svar fra oversettelsestjenesten."
        );

    }


    return {

        translations:
        data.translations,

        detectedSourceLanguages:
            Array.isArray(
                data.detectedSourceLanguages
            )
                ? data.detectedSourceLanguages
                : []

    };

}


// ============================================================
// CREATE TASK
// ============================================================

async function createTask(
    property,
    floor,
    name,
    description,
    order
) {

    const plan =
        await getOrCreatePlan();


    if (!plan) {

        return;

    }


    // ========================================================
    // SHIFT EXISTING ORDERS
    // ========================================================

    const sortedItems =
        [...currentTasks]
            .sort(
                function (a, b) {

                    return (
                        b.sort_order -
                        a.sort_order
                    );

                }
            );


    for (
        const item of sortedItems
        ) {

        if (
            item.sort_order >=
            order
        ) {

            const {
                error
            } =
                await supabaseClient
                    .from(
                        "cleaning_plan_items"
                    )
                    .update({

                        sort_order:
                            item.sort_order +
                            1

                    })
                    .eq(
                        "id",
                        item.id
                    );


            if (error) {

                console.error(
                    "SHIFT ORDER ERROR:",
                    error
                );


                showTaskMessage(
                    "Kunne ikke oppdatere rekkefølgen.",
                    "error"
                );


                return;

            }

        }

    }


    // ========================================================
    // CREATE CLEANING TASK
    // ========================================================

    const {
        data: createdTask,
        error: taskError
    } =
        await supabaseClient
            .from(
                "cleaning_tasks"
            )
            .insert({

                property_id:
                property.id,

                floor_id:
                floor.id,

                name:
                name,

                description:
                    description ||
                    null,

                sort_order:
                order,

                is_active:
                    true

            })
            .select(
                "id"
            )
            .single();


    if (taskError) {

        console.error(
            "CREATE TASK ERROR:",
            taskError
        );


        if (
            taskError.code ===
            "23505"
        ) {

            showTaskMessage(
                "Denne oppgaven finnes allerede på denne etasjen.",
                "error"
            );

        }
        else {

            showTaskMessage(
                "Kunne ikke opprette oppgaven.",
                "error"
            );

        }


        await loadTasks();


        return;

    }


    // ========================================================
    // CONNECT TASK TO PLAN
    // ========================================================

    const {
        error: itemError
    } =
        await supabaseClient
            .from(
                "cleaning_plan_items"
            )
            .insert({

                plan_id:
                plan.id,

                task_id:
                createdTask.id,

                sort_order:
                order

            });


    if (itemError) {

        console.error(
            "CREATE PLAN ITEM ERROR:",
            itemError
        );


        await supabaseClient
            .from(
                "cleaning_tasks"
            )
            .delete()
            .eq(
                "id",
                createdTask.id
            );


        showTaskMessage(
            "Kunne ikke koble oppgaven til rengjøringsplanen.",
            "error"
        );


        await loadTasks();


        return;

    }


    // ========================================================
    // CREATE NO + EN TRANSLATIONS
    // ========================================================

    const {
        data: translationData,
        error: translationError
    } =
        await supabaseClient
            .functions
            .invoke(
                "translate-cleaning-text",
                {
                    body: {

                        action:
                            "translate-and-save-task",

                        taskId:
                        createdTask.id,

                        name:
                        name,

                        description:
                        description

                    }
                }
            );


    if (
        translationError ||
        !translationData ||
        translationData.success !== true
    ) {

        console.error(
            "CREATE TASK TRANSLATIONS ERROR:",
            translationError ||
            translationData
        );


        showTaskMessage(
            "Oppgaven ble opprettet, men oversettelsen kunne ikke lagres.",
            "error"
        );


        resetTaskForm();

        await loadTasks();

        return;

    }


    showTaskMessage(
        "Oppgaven ble lagt til.",
        "success"
    );


    resetTaskForm();


    await loadTasks();

}


// ============================================================
// UPDATE TASK
// ============================================================

async function updateTask(
    taskId,
    name,
    description,
    newOrder
) {

    const currentItem =
        currentTasks.find(
            function (item) {

                return (
                    item.task_id ===
                    taskId
                );

            }
        );


    if (!currentItem) {

        showTaskMessage(
            "Kunne ikke finne oppgaven.",
            "error"
        );


        return;

    }


    const oldOrder =
        currentItem.sort_order;


    // ========================================================
    // TEMPORARY ORDER
    // ========================================================

    if (
        newOrder !==
        oldOrder
    ) {

        const {
            error: temporaryError
        } =
            await supabaseClient
                .from(
                    "cleaning_plan_items"
                )
                .update({

                    sort_order:
                        1000000

                })
                .eq(
                    "id",
                    currentItem.id
                );


        if (temporaryError) {

            console.error(
                "TEMPORARY TASK ORDER ERROR:",
                temporaryError
            );


            showTaskMessage(
                "Kunne ikke endre rekkefølgen.",
                "error"
            );


            return;

        }


        // ====================================================
        // MOVING TASK UP
        // ====================================================

        if (
            newOrder <
            oldOrder
        ) {

            const affectedItems =
                currentTasks
                    .filter(
                        function (item) {

                            return (
                                item.id !==
                                currentItem.id &&
                                item.sort_order >=
                                newOrder &&
                                item.sort_order <
                                oldOrder
                            );

                        }
                    )
                    .sort(
                        function (a, b) {

                            return (
                                b.sort_order -
                                a.sort_order
                            );

                        }
                    );


            for (
                const item of affectedItems
                ) {

                const {
                    error
                } =
                    await supabaseClient
                        .from(
                            "cleaning_plan_items"
                        )
                        .update({

                            sort_order:
                                item.sort_order +
                                1

                        })
                        .eq(
                            "id",
                            item.id
                        );


                if (error) {

                    console.error(
                        "MOVE TASK UP ERROR:",
                        error
                    );


                    showTaskMessage(
                        "Kunne ikke endre rekkefølgen.",
                        "error"
                    );


                    await loadTasks();


                    return;

                }

            }

        }


            // ====================================================
            // MOVING TASK DOWN
        // ====================================================

        else {

            const affectedItems =
                currentTasks
                    .filter(
                        function (item) {

                            return (
                                item.id !==
                                currentItem.id &&
                                item.sort_order <=
                                newOrder &&
                                item.sort_order >
                                oldOrder
                            );

                        }
                    )
                    .sort(
                        function (a, b) {

                            return (
                                a.sort_order -
                                b.sort_order
                            );

                        }
                    );


            for (
                const item of affectedItems
                ) {

                const {
                    error
                } =
                    await supabaseClient
                        .from(
                            "cleaning_plan_items"
                        )
                        .update({

                            sort_order:
                                item.sort_order -
                                1

                        })
                        .eq(
                            "id",
                            item.id
                        );


                if (error) {

                    console.error(
                        "MOVE TASK DOWN ERROR:",
                        error
                    );


                    showTaskMessage(
                        "Kunne ikke endre rekkefølgen.",
                        "error"
                    );


                    await loadTasks();


                    return;

                }

            }

        }


        // ====================================================
        // SAVE FINAL ORDER FOR CURRENT TASK
        // ====================================================

        const {
            error: finalOrderError
        } =
            await supabaseClient
                .from(
                    "cleaning_plan_items"
                )
                .update({

                    sort_order:
                    newOrder

                })
                .eq(
                    "id",
                    currentItem.id
                );


        if (finalOrderError) {

            console.error(
                "FINAL TASK ORDER ERROR:",
                finalOrderError
            );


            showTaskMessage(
                "Kunne ikke lagre rekkefølgen.",
                "error"
            );


            await loadTasks();


            return;

        }

    }


    // ========================================================
    // UPDATE CLEANING TASK
    // ========================================================

    const {
        error
    } =
        await supabaseClient
            .from(
                "cleaning_tasks"
            )
            .update({

                name:
                name,

                description:
                    description ||
                    null,

                sort_order:
                newOrder,

                updated_at:
                    new Date()
                        .toISOString()

            })
            .eq(
                "id",
                taskId
            );


    if (error) {

        console.error(
            "UPDATE TASK ERROR:",
            error
        );


        if (
            error.code ===
            "23505"
        ) {

            showTaskMessage(
                "Denne oppgaven finnes allerede.",
                "error"
            );

        }
        else {

            showTaskMessage(
                "Kunne ikke oppdatere oppgaven.",
                "error"
            );

        }


        await loadTasks();


        return;

    }


    // ========================================================
    // UPDATE NO + EN TRANSLATIONS
    // ========================================================

    const {
        data: translationData,
        error: translationError
    } =
        await supabaseClient
            .functions
            .invoke(
                "translate-cleaning-text",
                {
                    body: {

                        action:
                            "translate-and-save-task",

                        taskId:
                        taskId,

                        name:
                        name,

                        description:
                        description

                    }
                }
            );


    // ========================================================
    // TRANSLATION ERROR
    // ========================================================

    if (
        translationError ||
        !translationData ||
        translationData.success !==
        true
    ) {

        console.error(
            "UPDATE TASK TRANSLATIONS ERROR:",
            translationError ||
            translationData
        );


        showTaskMessage(
            "Oppgaven ble oppdatert, men oversettelsen kunne ikke oppdateres.",
            "error"
        );


        resetTaskForm();


        await loadTasks();


        return;

    }


    // ========================================================
    // SUCCESS
    // ========================================================

    showTaskMessage(
        "Oppgaven ble oppdatert.",
        "success"
    );


    resetTaskForm();


    await loadTasks();

}


// ============================================================
// DELETE TASK
// ============================================================

async function deleteTask(
    item
) {

    const task =
        item.cleaning_tasks;


    const confirmed =
        window.confirm(
            'Vil du slette oppgaven "' +
            task.name +
            '"?'
        );


    if (!confirmed) {

        return;

    }


    const {
        error
    } =
        await supabaseClient
            .from(
                "cleaning_tasks"
            )
            .delete()
            .eq(
                "id",
                task.id
            );


    if (error) {

        console.error(
            "DELETE TASK ERROR:",
            error
        );


        showTaskMessage(
            "Kunne ikke slette oppgaven.",
            "error"
        );


        return;

    }


    showTaskMessage(
        "Oppgaven ble slettet.",
        "success"
    );


    resetTaskForm();


    await normalizeTaskOrder();


    await loadTasks();

}


// ============================================================
// NORMALIZE ORDER
// ============================================================

async function normalizeTaskOrder() {

    await loadTasks();


    const items =
        [...currentTasks]
            .sort(
                function (a, b) {

                    return (
                        a.sort_order -
                        b.sort_order
                    );

                }
            );


    /*
        Bruk midlertidige verdier først.

        Dette unngår konflikt med unique constraint:
        plan_id + sort_order.
    */

    for (
        let index = 0;
        index < items.length;
        index++
    ) {

        const {
            error
        } =
            await supabaseClient
                .from(
                    "cleaning_plan_items"
                )
                .update({

                    sort_order:
                        2000000 +
                        index

                })
                .eq(
                    "id",
                    items[index].id
                );


        if (error) {

            console.error(
                "NORMALIZE TEMP ORDER ERROR:",
                error
            );


            return;

        }

    }


    /*
        Nå kan vi trygt sette 1, 2, 3, 4...
    */

    for (
        let index = 0;
        index < items.length;
        index++
    ) {

        const expectedOrder =
            index + 1;


        const item =
            items[index];


        const {
            error: itemError
        } =
            await supabaseClient
                .from(
                    "cleaning_plan_items"
                )
                .update({

                    sort_order:
                    expectedOrder

                })
                .eq(
                    "id",
                    item.id
                );


        if (itemError) {

            console.error(
                "NORMALIZE PLAN ITEM ERROR:",
                itemError
            );


            return;

        }


        const {
            error: taskError
        } =
            await supabaseClient
                .from(
                    "cleaning_tasks"
                )
                .update({

                    sort_order:
                    expectedOrder,

                    updated_at:
                        new Date()
                            .toISOString()

                })
                .eq(
                    "id",
                    item.task_id
                );


        if (taskError) {

            console.error(
                "NORMALIZE CLEANING TASK ERROR:",
                taskError
            );


            return;

        }

    }

}


// ============================================================
// PROPERTY CHANGE
// ============================================================

if (propertySelect) {

    propertySelect.addEventListener(
        "change",
        async function () {

            resetTaskForm();


            showTaskMessage(
                ""
            );


            draggedTaskId =
                null;


            await loadFloors(
                propertySelect.value
            );

        }
    );

}


// ============================================================
// FLOOR CHANGE
// ============================================================

if (floorSelect) {

    floorSelect.addEventListener(
        "change",
        async function () {

            resetTaskForm();


            showTaskMessage(
                ""
            );


            draggedTaskId =
                null;


            const property =
                getSelectedProperty();

            const floor =
                getSelectedFloor();


            if (
                !property ||
                !floor
            ) {

                if (taskManagementSection) {

                    taskManagementSection.hidden =
                        true;

                }


                return;

            }


            if (selectedLocationText) {

                selectedLocationText.textContent =
                    property.name +
                    " • " +
                    (
                        floor.name ||
                        floor.floor_number
                    );

            }


            if (taskManagementSection) {

                taskManagementSection.hidden =
                    false;

            }


            await loadTasks();

        }
    );

}


// ============================================================
// INITIALIZE
// ============================================================

async function initAdminCleaningPlan() {

    const allowed =
        await checkAdminAccess();


    if (!allowed) {

        return;

    }


    await loadProperties();

}


// ============================================================
// START
// ============================================================

initAdminCleaningPlan();