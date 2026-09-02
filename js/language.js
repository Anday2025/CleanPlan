// ============================================================
// CLEANPLAN
// LANGUAGE SYSTEM
//
// Interface languages:
// - Norwegian (NO)
// - English   (EN)
//
// Cleaning task translations from other source languages
// will later be handled through the Translation API.
// ============================================================

document.addEventListener(
    "DOMContentLoaded",
    function () {


        // ========================================================
        // DOM ELEMENTS
        // ========================================================

        const languageButton =
            document.getElementById(
                "languageButton"
            );

        const languageModal =
            document.getElementById(
                "languageModal"
            );

        const languageSearchInput =
            document.getElementById(
                "languageSearchInput"
            );

        const clearLanguageSearchButton =
            document.getElementById(
                "clearLanguageSearchButton"
            );

        const languageList =
            document.getElementById(
                "languageList"
            );

        const languageResultText =
            document.getElementById(
                "languageResultText"
            );

        const languageSearchEmpty =
            document.getElementById(
                "languageSearchEmpty"
            );

        const selectedLanguageName =
            document.getElementById(
                "selectedLanguageName"
            );

        const languageSelector =
            document.querySelector(
                ".language-selector"
            );


        // ========================================================
        // AVAILABLE LANGUAGES
        // ONLY NO + EN
        // ========================================================

        const languages = [

            {
                code: "no",
                shortCode: "NO",
                name: "Norwegian",
                nativeName: "Norsk",
                flag: "🇳🇴"
            },

            {
                code: "en",
                shortCode: "EN",
                name: "English",
                nativeName: "English",
                flag: "🇬🇧"
            }

        ];


        // ========================================================
        // TRANSLATIONS
        // ========================================================

        const translations = {


            // ====================================================
            // NORWEGIAN
            // ====================================================

            no: {


                // =================================================
                // GENERAL / LOGIN
                // =================================================

                login:
                    "Logg inn",

                loginUppercase:
                    "LOGG INN",

                logout:
                    "Logg ut",

                landingTitleLine1:
                    "Hold rengjøringen",

                landingTitleLine2:
                    "enkel og oversiktlig",

                landingDescription:
                    "Hold oversikt over oppgaver, ansvar og utført rengjøring – på ett sted.",

                benefitPlan:
                    "Se din rengjøringsplan",

                benefitDocument:
                    "Dokumenter utført rengjøring",

                benefitResidents:
                    "Samarbeid med andre beboere",

                properties:
                    "Boliger",

                cleaningPlan:
                    "Rengjøringsplan",

                documentation:
                    "Dokumentasjon",

                swapTasks:
                    "Bytte oppgaver",

                email:
                    "E-post",

                password:
                    "Passord",

                emailPlaceholder:
                    "din@epost.no",

                passwordPlaceholder:
                    "Ditt passord",

                or:
                    "eller",

                forgotPassword:
                    "Glemt passord?",

                closeLogin:
                    "Lukk innlogging",


                // =================================================
                // LANGUAGE SELECTOR
                // =================================================

                languageSearchPlaceholder:
                    "Søk etter språk...",

                languageSearchAriaLabel:
                    "Søk etter språk",

                clearLanguageSearch:
                    "Tøm søk",

                availableLanguages:
                    "Tilgjengelige språk",

                loadingAvailableLanguages:
                    "Laster tilgjengelige språk...",

                noLanguagesFound:
                    "Ingen språk funnet",

                tryAnotherSearch:
                    "Prøv et annet søk.",

                languageSingular:
                    "språk",

                languagePlural:
                    "språk",


                // =================================================
                // RESIDENT PAGE
                // =================================================

                residentPageTitle:
                    "Cleaning App - Min side",

                residentRole:
                    "BEBOER",

                residentWelcomeDescription:
                    "Her finner du boligen din, rengjøringsplanen og dine kommende rengjøringsuker.",

                loading:
                    "Laster...",

                residentLoadingDescription:
                    "Henter kontoen og rengjøringsplanen din.",

                propertyAssociation:
                    "Boligtilknytning",

                accountActive:
                    "Kontoen din er aktiv.",

                notAssignedProperty:
                    "Du er ikke tilknyttet en bolig ennå",

                notAssignedPropertyDescription:
                    "Kontoen din er opprettet og klar til bruk, men administrator har ikke koblet deg til en bolig og etasje ennå.",

                contactAdministratorProperty:
                    "Kontakt administrator dersom du mener at boligtilknytningen allerede skulle vært registrert.",

                myProperty:
                    "Min bolig",

                registeredPropertyFloor:
                    "Din registrerte bolig og etasje.",

                active:
                    "Aktiv",

                noCleaningPlanYet:
                    "Ingen rengjøringsplan ennå",

                noCleaningPlanDescription:
                    "Administrator har ikke opprettet en rengjøringsplan for etasjen din ennå.",

                thisWeek:
                    "DENNE UKEN",

                date:
                    "Dato",

                responsible:
                    "Ansvarlig",

                time:
                    "Tid",

                floor:
                    "Etasje",

                thursdayFallbackWarning:
                    "Hvis fredag ikke er mulig, skal rengjøringen utføres på torsdag.",

                viewPreviousUpcomingWeeks:
                    "Se tidligere og kommende uker.",

                previous:
                    "Forrige",

                next:
                    "Neste",

                selectedWeek:
                    "Valgt uke",

                status:
                    "Status",

                cleaningTasks:
                    "Rengjøringsoppgaver",

                noCleaningTasks:
                    "Det er ingen rengjøringsoppgaver registrert ennå.",


                // =================================================
                // DOCUMENTATION / CAMERA
                // =================================================

                documentWork:
                    "Dokumenter arbeidet",

                documentWorkDescription:
                    "Ta nye bilder med kameraet etter at rengjøringen er utført.",

                takePhoto:
                    "Ta bilde",

                takePhotoWithIcon:
                    "📷 Ta bilde",

                maxTenPhotos:
                    "Maks 10 bilder",

                maxTenPhotosAlert:
                    "Du kan legge til maksimalt 10 bilder.",

                photosCount:
                    "Bilder ({count}/10)",

                documentationPhotoAlt:
                    "Dokumentasjonsbilde",

                cleaningDocumentationPhoto:
                    "Dokumentasjonsbilde",

                removePhotoAria:
                    "Fjern bilde",

                deletePhoto:
                    "Slett bilde",

                maxPhotosTaken:
                    "✓ Maks antall bilder tatt",


                // =================================================
                // CONFIRM AND SIGN
                // =================================================

                confirmAndSign:
                    "Bekreft og signer",

                confirmAndSignDescription:
                    "Bekreft når alle oppgavene er utført og dokumentasjonen er lagt til.",

                signedBy:
                    "Signeres av",

                week:
                    "Uke",

                confirmCleaningCompleted:
                    "Bekreft og signer rengjøring utført",

                couldNotLoadPage:
                    "Kunne ikke laste siden",


                // =================================================
                // DYNAMIC RESIDENT TEXT
                // =================================================

                welcomeUser:
                    "Velkommen, {name}",

                propertyFallbackName:
                    "Bolig",

                noAddressRegistered:
                    "Ingen adresse registrert",

                floorPrefix:
                    "Etasje: {floor}",

                notRegistered:
                    "Ikke registrert",

                floorNumber:
                    "{floor}. etasje",

                couldNotFetchPropertyAssociation:
                    "Kunne ikke hente boligtilknytningen din.",

                couldNotFetchCleaningPlan:
                    "Kunne ikke hente rengjøringsplanen.",

                couldNotFetchCleaningTasks:
                    "Kunne ikke hente rengjøringsoppgavene.",

                couldNotFetchCleaningRotation:
                    "Kunne ikke hente rengjøringsrotasjonen.",

                noActiveCleaningPlan:
                    "Ingen aktiv rengjøringsplan er opprettet ennå.",

                notAssigned:
                    "Ikke tildelt",

                scheduled:
                    "Planlagt",

                planned:
                    "Planlagt",

                previousWeekStatus:
                    "Tidligere uke",

                upcoming:
                    "Kommende",

                notAvailableYet:
                    "Ikke tilgjengelig ennå",

                notYetAvailable:
                    "Ikke tilgjengelig ennå",

                open:
                    "Åpen",

                deadlinePassed:
                    "Frist utløpt",

                completed:
                    "Fullført ✓",

                notCompleted:
                    "Ikke fullført",

                cleaningWeekHeading:
                    "Rengjøring • Uke {week}",

                weekLabel:
                    "Uke {week}",

                zeroTasks:
                    "0 oppgaver",

                oneTask:
                    "{count} oppgave",

                multipleTasks:
                    "{count} oppgaver",

                cleaningTask:
                    "Rengjøringsoppgave",

                tasksCreatedByAdministrator:
                    "Oppgavene er opprettet av administrator.",

                tasksVisibleOnlyResponsibleCanComplete:
                    "Du kan se oppgavene, men bare ukens ansvarlige kan fullføre dem.",

                onlyNameCanComplete:
                    "Kun {name} kan fullføre denne uken.",

                onlyResponsibleCanConfirm:
                    "🔒 Kun ukens ansvarlige kan bekrefte rengjøringen.",

                onlyResponsibleResidentCanComplete:
                    "Kun den ansvarlige beboeren kan fullføre denne uken.",

                responsibleOnlyForWeek:
                    "🔒 Kun den ansvarlige for denne uken kan fullføre rengjøringen.",

                notActiveCleaningWeek:
                    "Dette er ikke den aktive rengjøringsuken.",

                tasksOnlyCurrentWeek:
                    "Oppgaver kan bare fullføres i den aktuelle uken.",

                onlyCurrentWeekCanBeCompleted:
                    "Bare den aktuelle rengjøringsuken kan fullføres.",

                selectCurrentWeekToClean:
                    "🔒 Velg den aktuelle uken for å utføre rengjøringen.",

                cleaningAvailableThursday:
                    "Rengjøringen blir tilgjengelig torsdag.",

                notAvailableThursdayFriday:
                    "Ikke tilgjengelig ennå. Rengjøring kan registreres torsdag eller fredag.",

                notYetAvailableLocked:
                    "🔒 Ikke tilgjengelig ennå. Rengjøring kan registreres torsdag eller fredag.",

                confirmationOpensThursday:
                    "🔒 Bekreftelse åpnes torsdag.",

                deadlineExpiredForWeek:
                    "Fristen for denne uken er utløpt.",

                cleaningCannotBeRegistered:
                    "Rengjøringen kan ikke lenger registreres for denne uken.",

                deadlineExpiredLocked:
                    "🔒 Fristen er utløpt.",

                responsibleThisWeekCheckTasks:
                    "Du er ansvarlig denne uken. Huk av oppgavene etter hvert som de utføres.",

                responsibleForThisWeek:
                    "Du er ansvarlig for denne uken.",

                completeTasksAndPhotoBeforeSign:
                    "Fullfør alle oppgaver og ta minst ett nytt bilde før du signerer.",

                cleaningAlreadySigned:
                    "Rengjøringen er allerede signert.",

                couldNotSaveTaskCompletion:
                    "Kunne ikke lagre oppgaven som fullført.",

                couldNotRemoveTaskCompletion:
                    "Kunne ikke fjerne fullføringen av oppgaven.",

                completionReadyForSupabase:
                    "Alle oppgaver er fullført og dokumentasjonen er klar.",

                unexpectedResidentPageError:
                    "Det oppstod en uventet feil på beboersiden.",

                errorOccurred:
                    "Det oppstod en feil.",


                // =================================================
                // CLEANING HISTORY
                // =================================================

                cleaningHistory:
                    "Logg",

                cleaningHistoryEyebrow:
                    "Historikk",

                cleaningHistoryDescription:
                    "Se tidligere rengjøringsuker og dokumentasjon for boligen og etasjen din.",

                closeCleaningHistory:
                    "Lukk historikk",

                loadingCleaningHistory:
                    "Laster rengjøringshistorikk...",

                noCleaningHistory:
                    "Ingen historikk ennå",

                noCleaningHistoryDescription:
                    "Tidligere rengjøringsuker vises her når de blir tilgjengelige.",

                cleaningHistoryResponsible:
                    "Ansvarlig",

                cleaningHistorySignedBy:
                    "Signert av",

                cleaningHistorySignedAt:
                    "Signert",

                cleaningHistoryDocumentation:
                    "Dokumentasjon",

                cleaningHistoryNoDocumentation:
                    "Ingen dokumentasjonsbilder",

                cleaningHistoryWeek:
                    "Uke"

            },


            // ====================================================
            // ENGLISH
            // DEL 2 CONTINUES HERE
            // ====================================================

            en: {                 // =================================================
                // GENERAL / LOGIN
                // =================================================

                login:
                    "Log in",

                loginUppercase:
                    "LOG IN",

                logout:
                    "Log out",

                landingTitleLine1:
                    "Keep cleaning",

                landingTitleLine2:
                    "simple and organized",

                landingDescription:
                    "Keep track of tasks, responsibilities and completed cleaning – all in one place.",

                benefitPlan:
                    "View your cleaning schedule",

                benefitDocument:
                    "Document completed cleaning",

                benefitResidents:
                    "Collaborate with other residents",

                properties:
                    "Properties",

                cleaningPlan:
                    "Cleaning schedule",

                documentation:
                    "Documentation",

                swapTasks:
                    "Swap tasks",

                email:
                    "Email",

                password:
                    "Password",

                emailPlaceholder:
                    "your@email.com",

                passwordPlaceholder:
                    "Your password",

                or:
                    "or",

                forgotPassword:
                    "Forgot password?",

                closeLogin:
                    "Close login",


                // =================================================
                // LANGUAGE SELECTOR
                // =================================================

                languageSearchPlaceholder:
                    "Search languages...",

                languageSearchAriaLabel:
                    "Search languages",

                clearLanguageSearch:
                    "Clear search",

                availableLanguages:
                    "Available languages",

                loadingAvailableLanguages:
                    "Loading available languages...",

                noLanguagesFound:
                    "No languages found",

                tryAnotherSearch:
                    "Try another search.",

                languageSingular:
                    "language",

                languagePlural:
                    "languages",


                // =================================================
                // RESIDENT PAGE
                // =================================================

                residentPageTitle:
                    "Cleaning App - My page",

                residentRole:
                    "RESIDENT",

                residentWelcomeDescription:
                    "Here you can find your property, cleaning schedule and upcoming cleaning weeks.",

                loading:
                    "Loading...",

                residentLoadingDescription:
                    "Loading your account and cleaning schedule.",

                propertyAssociation:
                    "Property assignment",

                accountActive:
                    "Your account is active.",

                notAssignedProperty:
                    "You are not assigned to a property yet",

                notAssignedPropertyDescription:
                    "Your account has been created and is ready to use, but an administrator has not yet assigned you to a property and floor.",

                contactAdministratorProperty:
                    "Contact an administrator if you believe your property assignment should already have been registered.",

                myProperty:
                    "My property",

                registeredPropertyFloor:
                    "Your registered property and floor.",

                active:
                    "Active",

                noCleaningPlanYet:
                    "No cleaning schedule yet",

                noCleaningPlanDescription:
                    "An administrator has not created a cleaning schedule for your floor yet.",

                thisWeek:
                    "THIS WEEK",

                date:
                    "Date",

                responsible:
                    "Responsible",

                time:
                    "Time",

                floor:
                    "Floor",

                thursdayFallbackWarning:
                    "If Friday is not possible, cleaning must be completed on Thursday.",

                viewPreviousUpcomingWeeks:
                    "View previous and upcoming weeks.",

                previous:
                    "Previous",

                next:
                    "Next",

                selectedWeek:
                    "Selected week",

                status:
                    "Status",

                cleaningTasks:
                    "Cleaning tasks",

                noCleaningTasks:
                    "No cleaning tasks have been registered yet.",


                // =================================================
                // DOCUMENTATION / CAMERA
                // =================================================

                documentWork:
                    "Document the work",

                documentWorkDescription:
                    "Take new photos with the camera after the cleaning has been completed.",

                takePhoto:
                    "Take photo",

                takePhotoWithIcon:
                    "📷 Take photo",

                maxTenPhotos:
                    "Maximum 10 photos",

                maxTenPhotosAlert:
                    "You can add a maximum of 10 photos.",

                photosCount:
                    "Photos ({count}/10)",

                documentationPhotoAlt:
                    "Documentation photo",

                cleaningDocumentationPhoto:
                    "Documentation photo",

                removePhotoAria:
                    "Remove photo",

                deletePhoto:
                    "Delete photo",

                maxPhotosTaken:
                    "✓ Maximum number of photos taken",


                // =================================================
                // CONFIRM AND SIGN
                // =================================================

                confirmAndSign:
                    "Confirm and sign",

                confirmAndSignDescription:
                    "Confirm when all tasks have been completed and the documentation has been added.",

                signedBy:
                    "Signed by",

                week:
                    "Week",

                confirmCleaningCompleted:
                    "Confirm and sign cleaning completed",

                couldNotLoadPage:
                    "Could not load the page",


                // =================================================
                // DYNAMIC RESIDENT TEXT
                // =================================================

                welcomeUser:
                    "Welcome, {name}",

                propertyFallbackName:
                    "Property",

                noAddressRegistered:
                    "No address registered",

                floorPrefix:
                    "Floor: {floor}",

                notRegistered:
                    "Not registered",

                floorNumber:
                    "Floor {floor}",

                couldNotFetchPropertyAssociation:
                    "Could not load your property assignment.",

                couldNotFetchCleaningPlan:
                    "Could not load the cleaning schedule.",

                couldNotFetchCleaningTasks:
                    "Could not load the cleaning tasks.",

                couldNotFetchCleaningRotation:
                    "Could not load the cleaning rotation.",

                noActiveCleaningPlan:
                    "No active cleaning schedule has been created yet.",

                notAssigned:
                    "Not assigned",

                scheduled:
                    "Scheduled",

                planned:
                    "Scheduled",

                previousWeekStatus:
                    "Previous week",

                upcoming:
                    "Upcoming",

                notAvailableYet:
                    "Not available yet",

                notYetAvailable:
                    "Not available yet",

                open:
                    "Open",

                deadlinePassed:
                    "Deadline passed",

                completed:
                    "Completed ✓",

                notCompleted:
                    "Not completed",

                cleaningWeekHeading:
                    "Cleaning • Week {week}",

                weekLabel:
                    "Week {week}",

                zeroTasks:
                    "0 tasks",

                oneTask:
                    "{count} task",

                multipleTasks:
                    "{count} tasks",

                cleaningTask:
                    "Cleaning task",

                tasksCreatedByAdministrator:
                    "The tasks were created by the administrator.",

                tasksVisibleOnlyResponsibleCanComplete:
                    "You can view the tasks, but only the resident responsible for this week can complete them.",

                onlyNameCanComplete:
                    "Only {name} can complete this week.",

                onlyResponsibleCanConfirm:
                    "🔒 Only the resident responsible for this week can confirm the cleaning.",

                onlyResponsibleResidentCanComplete:
                    "Only the responsible resident can complete this week.",

                responsibleOnlyForWeek:
                    "🔒 Only the resident responsible for this week can complete the cleaning.",

                notActiveCleaningWeek:
                    "This is not the active cleaning week.",

                tasksOnlyCurrentWeek:
                    "Tasks can only be completed during the current cleaning week.",

                onlyCurrentWeekCanBeCompleted:
                    "Only the current cleaning week can be completed.",

                selectCurrentWeekToClean:
                    "🔒 Select the current week to complete the cleaning.",

                cleaningAvailableThursday:
                    "Cleaning becomes available on Thursday.",

                notAvailableThursdayFriday:
                    "Not available yet. Cleaning can be registered on Thursday or Friday.",

                notYetAvailableLocked:
                    "🔒 Not available yet. Cleaning can be registered on Thursday or Friday.",

                confirmationOpensThursday:
                    "🔒 Confirmation opens on Thursday.",

                deadlineExpiredForWeek:
                    "The deadline for this week has passed.",

                cleaningCannotBeRegistered:
                    "Cleaning can no longer be registered for this week.",

                deadlineExpiredLocked:
                    "🔒 The deadline has passed.",

                responsibleThisWeekCheckTasks:
                    "You are responsible this week. Check off each task as it is completed.",

                responsibleForThisWeek:
                    "You are responsible for this week.",

                completeTasksAndPhotoBeforeSign:
                    "Complete all tasks and take at least one new photo before signing.",

                cleaningAlreadySigned:
                    "The cleaning has already been signed.",

                couldNotSaveTaskCompletion:
                    "Could not save the task as completed.",

                couldNotRemoveTaskCompletion:
                    "Could not remove the task completion.",

                completionReadyForSupabase:
                    "All tasks are completed and the documentation is ready.",

                unexpectedResidentPageError:
                    "An unexpected error occurred on the resident page.",

                errorOccurred:
                    "An error occurred.",


                // =================================================
                // CLEANING HISTORY
                // =================================================

                cleaningHistory:
                    "Log",

                cleaningHistoryEyebrow:
                    "History",

                cleaningHistoryDescription:
                    "View previous cleaning weeks and documentation for your property and floor.",

                closeCleaningHistory:
                    "Close history",

                loadingCleaningHistory:
                    "Loading cleaning history...",

                noCleaningHistory:
                    "No history yet",

                noCleaningHistoryDescription:
                    "Previous cleaning weeks will appear here when they become available.",

                cleaningHistoryResponsible:
                    "Responsible",

                cleaningHistorySignedBy:
                    "Signed by",

                cleaningHistorySignedAt:
                    "Signed",

                cleaningHistoryDocumentation:
                    "Documentation",

                cleaningHistoryNoDocumentation:
                    "No documentation photos",

                cleaningHistoryWeek:
                    "Week"

            }

        };


        // ========================================================
        // CURRENT LANGUAGE
        // ========================================================

        let currentLanguageCode =
            localStorage.getItem(
                "cleaningAppLanguage"
            ) || "no";


        /*
         * If an old language such as sv, pl, ti, etc.
         * is still saved from the previous 29-language version,
         * reset safely to Norwegian.
         */
        if (
            !languages.some(
                function (language) {

                    return (
                        language.code ===
                        currentLanguageCode
                    );

                }
            )
        ) {

            currentLanguageCode =
                "no";


            localStorage.setItem(
                "cleaningAppLanguage",
                "no"
            );

        }


        // ========================================================
        // GET LANGUAGE BY CODE
        // ========================================================

        function getLanguageByCode(
            code
        ) {

            return languages.find(
                function (language) {

                    return (
                        language.code ===
                        code
                    );

                }
            );

        }


        // ========================================================
        // INTERPOLATE
        // ========================================================

        function interpolate(
            text,
            params
        ) {

            if (
                !params ||
                typeof text !==
                "string"
            ) {

                return text;

            }


            return text.replace(
                /\{(\w+)\}/g,
                function (
                    match,
                    key
                ) {

                    return Object.prototype
                        .hasOwnProperty
                        .call(
                            params,
                            key
                        )
                        ? String(
                            params[key]
                        )
                        : match;

                }
            );

        }


        // ========================================================
        // GET TRANSLATION
        // ========================================================

        function getTranslation(
            key,
            params
        ) {

            const currentTranslations =
                translations[
                    currentLanguageCode
                    ];


            const fallbackTranslations =
                translations.no;


            let value;


            if (
                currentTranslations &&
                Object.prototype
                    .hasOwnProperty
                    .call(
                        currentTranslations,
                        key
                    )
            ) {

                value =
                    currentTranslations[
                        key
                        ];

            } else if (
                fallbackTranslations &&
                Object.prototype
                    .hasOwnProperty
                    .call(
                        fallbackTranslations,
                        key
                    )
            ) {

                value =
                    fallbackTranslations[
                        key
                        ];

            } else {

                value =
                    key;

            }


            return interpolate(
                value,
                params
            );

        }


        // ========================================================
        // TRANSLATE PAGE
        // ========================================================

        function translatePage() {

            document
                .querySelectorAll(
                    "[data-i18n]"
                )
                .forEach(
                    function (element) {

                        const key =
                            element.dataset
                                .i18n;


                        if (
                            key
                        ) {

                            element.textContent =
                                getTranslation(
                                    key
                                );

                        }

                    }
                );


            document
                .querySelectorAll(
                    "[data-i18n-placeholder]"
                )
                .forEach(
                    function (element) {

                        const key =
                            element.dataset
                                .i18nPlaceholder;


                        if (
                            key
                        ) {

                            element.setAttribute(
                                "placeholder",
                                getTranslation(
                                    key
                                )
                            );

                        }

                    }
                );


            document
                .querySelectorAll(
                    "[data-i18n-aria-label]"
                )
                .forEach(
                    function (element) {

                        const key =
                            element.dataset
                                .i18nAriaLabel;


                        if (
                            key
                        ) {

                            element.setAttribute(
                                "aria-label",
                                getTranslation(
                                    key
                                )
                            );

                        }

                    }
                );


            document
                .querySelectorAll(
                    "[data-i18n-title]"
                )
                .forEach(
                    function (element) {

                        const key =
                            element.dataset
                                .i18nTitle;


                        if (
                            key
                        ) {

                            element.setAttribute(
                                "title",
                                getTranslation(
                                    key
                                )
                            );

                        }

                    }
                );


            const titleElement =
                document.querySelector(
                    "title[data-i18n-title]"
                );


            if (
                titleElement
            ) {

                const titleKey =
                    titleElement.dataset
                        .i18nTitle;


                if (
                    titleKey
                ) {

                    document.title =
                        getTranslation(
                            titleKey
                        );

                }

            }


            document.documentElement.lang =
                currentLanguageCode;

        }


        // ========================================================
        // UPDATE LANGUAGE BUTTON
        // ========================================================

        function updateLanguageButton() {

            const language =
                getLanguageByCode(
                    currentLanguageCode
                );


            if (
                !language
            ) {

                currentLanguageCode =
                    "no";


                localStorage.setItem(
                    "cleaningAppLanguage",
                    "no"
                );


                updateLanguageButton();

                return;

            }


            if (
                selectedLanguageName
            ) {

                selectedLanguageName.textContent =
                    language.shortCode;

            }


            document.documentElement.lang =
                language.code;

        }               // ========================================================
        // OPEN LANGUAGE MODAL
        // ========================================================

        function openLanguageModal() {

            if (
                !languageModal
            ) {

                return;

            }


            languageModal.hidden =
                false;


            if (
                languageButton
            ) {

                languageButton.setAttribute(
                    "aria-expanded",
                    "true"
                );

            }


            renderLanguages();


            setTimeout(
                function () {

                    if (
                        languageSearchInput
                    ) {

                        languageSearchInput.focus();

                    }

                },
                0
            );

        }


        // ========================================================
        // CLOSE LANGUAGE MODAL
        // ========================================================

        function closeLanguageModal() {

            if (
                !languageModal
            ) {

                return;

            }


            languageModal.hidden =
                true;


            if (
                languageButton
            ) {

                languageButton.setAttribute(
                    "aria-expanded",
                    "false"
                );

            }

        }


        // ========================================================
        // TOGGLE LANGUAGE MODAL
        // ========================================================

        function toggleLanguageModal() {

            if (
                !languageModal
            ) {

                return;

            }


            if (
                languageModal.hidden
            ) {

                openLanguageModal();

            } else {

                closeLanguageModal();

            }

        }


        // ========================================================
        // CREATE LANGUAGE ITEM
        // ========================================================

        function createLanguageItem(
            language
        ) {

            const button =
                document.createElement(
                    "button"
                );


            button.type =
                "button";


            button.className =
                "language-item";


            button.dataset.languageCode =
                language.code;


            button.setAttribute(
                "role",
                "option"
            );


            const isSelected =
                language.code ===
                currentLanguageCode;


            button.setAttribute(
                "aria-selected",
                isSelected
                    ? "true"
                    : "false"
            );


            if (
                isSelected
            ) {

                button.classList.add(
                    "active"
                );

            }


            // ----------------------------------------------------
            // FLAG
            // ----------------------------------------------------

            const flag =
                document.createElement(
                    "span"
                );


            flag.className =
                "language-item-flag";


            flag.textContent =
                language.flag;


            // ----------------------------------------------------
            // CODE
            // ----------------------------------------------------

            const code =
                document.createElement(
                    "span"
                );


            code.className =
                "language-item-code";


            code.textContent =
                language.shortCode;


            // ----------------------------------------------------
            // CHECKMARK
            // ----------------------------------------------------

            const check =
                document.createElement(
                    "span"
                );


            check.className =
                "language-item-check";


            check.textContent =
                isSelected
                    ? "✓"
                    : "";


            // ----------------------------------------------------
            // ADD CONTENT
            // ----------------------------------------------------

            button.appendChild(
                flag
            );


            button.appendChild(
                code
            );


            button.appendChild(
                check
            );


            // ----------------------------------------------------
            // SELECT LANGUAGE
            // ----------------------------------------------------

            button.addEventListener(
                "click",
                function (
                    event
                ) {

                    event.preventDefault();

                    event.stopPropagation();


                    selectLanguage(
                        language.code
                    );

                }
            );


            return button;

        }


        // ========================================================
        // FILTER LANGUAGES
        // ========================================================

        function getFilteredLanguages() {

            const searchValue =
                languageSearchInput
                    ? languageSearchInput
                        .value
                        .trim()
                        .toLowerCase()
                    : "";


            if (
                !searchValue
            ) {

                return languages;

            }


            return languages.filter(
                function (
                    language
                ) {

                    const searchableText =
                        [
                            language.code,
                            language.shortCode,
                            language.name,
                            language.nativeName
                        ]
                            .join(
                                " "
                            )
                            .toLowerCase();


                    return searchableText
                        .includes(
                            searchValue
                        );

                }
            );

        }


        // ========================================================
        // RENDER LANGUAGES
        // ========================================================

        function renderLanguages() {

            if (
                !languageList
            ) {

                return;

            }


            const filteredLanguages =
                getFilteredLanguages();


            languageList.innerHTML =
                "";


            // ----------------------------------------------------
            // RESULT COUNT
            // ----------------------------------------------------

            if (
                languageResultText
            ) {

                const languageCountKey =
                    filteredLanguages.length ===
                    1
                        ? "languageSingular"
                        : "languagePlural";


                languageResultText.textContent =
                    filteredLanguages.length +
                    " " +
                    getTranslation(
                        languageCountKey
                    );

            }


            // ----------------------------------------------------
            // NO RESULTS
            // ----------------------------------------------------

            if (
                filteredLanguages.length ===
                0
            ) {

                languageList.hidden =
                    true;


                if (
                    languageSearchEmpty
                ) {

                    languageSearchEmpty.hidden =
                        false;

                }


                return;

            }


            // ----------------------------------------------------
            // SHOW RESULTS
            // ----------------------------------------------------

            languageList.hidden =
                false;


            if (
                languageSearchEmpty
            ) {

                languageSearchEmpty.hidden =
                    true;

            }


            // ----------------------------------------------------
            // ITEMS
            //
            // Each item is appended separately.
            // Therefore NO and EN are displayed vertically,
            // one row under the other.
            // ----------------------------------------------------

            filteredLanguages.forEach(
                function (
                    language
                ) {

                    languageList.appendChild(
                        createLanguageItem(
                            language
                        )
                    );

                }
            );


            // ----------------------------------------------------
            // CLEAR SEARCH BUTTON
            // ----------------------------------------------------

            if (
                clearLanguageSearchButton &&
                languageSearchInput
            ) {

                clearLanguageSearchButton.hidden =
                    languageSearchInput
                        .value
                        .trim()
                        .length ===
                    0;

            }

        }


        // ========================================================
        // SELECT LANGUAGE
        // ========================================================

        function selectLanguage(
            languageCode
        ) {

            const language =
                getLanguageByCode(
                    languageCode
                );


            if (
                !language
            ) {

                console.warn(
                    "Unknown language:",
                    languageCode
                );

                return;

            }


            currentLanguageCode =
                language.code;


            // ----------------------------------------------------
            // SAVE
            // ----------------------------------------------------

            localStorage.setItem(
                "cleaningAppLanguage",
                currentLanguageCode
            );


            // ----------------------------------------------------
            // UPDATE PAGE
            // ----------------------------------------------------

            updateLanguageButton();

            translatePage();


            // ----------------------------------------------------
            // RESET SEARCH
            // ----------------------------------------------------

            if (
                languageSearchInput
            ) {

                languageSearchInput.value =
                    "";

            }


            renderLanguages();

            closeLanguageModal();


            // ----------------------------------------------------
            // NOTIFY OTHER JS FILES
            // ----------------------------------------------------

            window.dispatchEvent(
                new CustomEvent(
                    "cleanplan:languagechange",
                    {
                        detail: {

                            languageCode:
                            currentLanguageCode

                        }
                    }
                )
            );

        }


        // ========================================================
        // LANGUAGE BUTTON
        // ========================================================

        if (
            languageButton
        ) {

            languageButton.addEventListener(
                "click",
                function (
                    event
                ) {

                    event.preventDefault();

                    event.stopPropagation();


                    toggleLanguageModal();

                }
            );

        }


        // ========================================================
        // SEARCH
        // ========================================================

        if (
            languageSearchInput
        ) {

            languageSearchInput.addEventListener(
                "input",
                function () {

                    renderLanguages();

                }
            );


            languageSearchInput.addEventListener(
                "click",
                function (
                    event
                ) {

                    event.stopPropagation();

                }
            );

        }


        // ========================================================
        // CLEAR SEARCH
        // ========================================================

        if (
            clearLanguageSearchButton
        ) {

            clearLanguageSearchButton.addEventListener(
                "click",
                function (
                    event
                ) {

                    event.preventDefault();

                    event.stopPropagation();


                    if (
                        !languageSearchInput
                    ) {

                        return;

                    }


                    languageSearchInput.value =
                        "";


                    renderLanguages();

                    languageSearchInput.focus();

                }
            );

        }


        // ========================================================
        // DO NOT CLOSE WHEN CLICKING INSIDE LANGUAGE SELECTOR
        // ========================================================

        if (
            languageSelector
        ) {

            languageSelector.addEventListener(
                "click",
                function (
                    event
                ) {

                    event.stopPropagation();

                }
            );

        }


        // ========================================================
        // CLICK OUTSIDE
        // ========================================================

        document.addEventListener(
            "click",
            function (
                event
            ) {

                if (
                    languageSelector &&
                    languageSelector.contains(
                        event.target
                    )
                ) {

                    return;

                }


                closeLanguageModal();

            }
        );


        // ========================================================
        // ESCAPE
        // ========================================================

        document.addEventListener(
            "keydown",
            function (
                event
            ) {

                if (
                    event.key ===
                    "Escape"
                ) {

                    closeLanguageModal();

                }

            }
        );


        // ========================================================
        // PUBLIC I18N API
        // ========================================================

        window.CleanPlanI18n = {


            getLanguage:
                function () {

                    return currentLanguageCode;

                },


            t:
                function (
                    key,
                    params
                ) {

                    return getTranslation(
                        key,
                        params
                    );

                },


            applyTranslations:
                function () {

                    translatePage();

                },


            setLanguage:
                function (
                    languageCode
                ) {

                    selectLanguage(
                        languageCode
                    );

                }

        };


        // ========================================================
        // BACKWARD COMPATIBILITY
        // ========================================================

        window.cleanPlanLanguage =
            window.CleanPlanI18n;


        // ========================================================
        // INITIALIZE
        // ========================================================

        updateLanguageButton();

        translatePage();

        renderLanguages();

    }
);