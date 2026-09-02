// ============================================================
// CLEANPLAN
// LANGUAGE SYSTEM
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
        // LANGUAGES
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
            },

            {
                code: "sv",
                shortCode: "SV",
                name: "Swedish",
                nativeName: "Svenska",
                flag: "🇸🇪"
            },

            {
                code: "da",
                shortCode: "DA",
                name: "Danish",
                nativeName: "Dansk",
                flag: "🇩🇰"
            },

            {
                code: "de",
                shortCode: "DE",
                name: "German",
                nativeName: "Deutsch",
                flag: "🇩🇪"
            },

            {
                code: "fr",
                shortCode: "FR",
                name: "French",
                nativeName: "Français",
                flag: "🇫🇷"
            },

            {
                code: "es",
                shortCode: "ES",
                name: "Spanish",
                nativeName: "Español",
                flag: "🇪🇸"
            },

            {
                code: "it",
                shortCode: "IT",
                name: "Italian",
                nativeName: "Italiano",
                flag: "🇮🇹"
            },

            {
                code: "pt",
                shortCode: "PT",
                name: "Portuguese",
                nativeName: "Português",
                flag: "🇵🇹"
            },

            {
                code: "pl",
                shortCode: "PL",
                name: "Polish",
                nativeName: "Polski",
                flag: "🇵🇱"
            },

            {
                code: "ro",
                shortCode: "RO",
                name: "Romanian",
                nativeName: "Română",
                flag: "🇷🇴"
            },

            {
                code: "hu",
                shortCode: "HU",
                name: "Hungarian",
                nativeName: "Magyar",
                flag: "🇭🇺"
            },

            {
                code: "bg",
                shortCode: "BG",
                name: "Bulgarian",
                nativeName: "Български",
                flag: "🇧🇬"
            },

            {
                code: "el",
                shortCode: "EL",
                name: "Greek",
                nativeName: "Ελληνικά",
                flag: "🇬🇷"
            },

            {
                code: "hr",
                shortCode: "HR",
                name: "Croatian",
                nativeName: "Hrvatski",
                flag: "🇭🇷"
            },

            {
                code: "sk",
                shortCode: "SK",
                name: "Slovak",
                nativeName: "Slovenčina",
                flag: "🇸🇰"
            },

            {
                code: "cs",
                shortCode: "CS",
                name: "Czech",
                nativeName: "Čeština",
                flag: "🇨🇿"
            },

            {
                code: "uk",
                shortCode: "UK",
                name: "Ukrainian",
                nativeName: "Українська",
                flag: "🇺🇦"
            },

            {
                code: "ru",
                shortCode: "RU",
                name: "Russian",
                nativeName: "Русский",
                flag: "🇷🇺"
            },

            {
                code: "tr",
                shortCode: "TR",
                name: "Turkish",
                nativeName: "Türkçe",
                flag: "🇹🇷"
            },

            {
                code: "ar",
                shortCode: "AR",
                name: "Arabic",
                nativeName: "العربية",
                flag: "🇸🇦"
            },

            {
                code: "am",
                shortCode: "AM",
                name: "Amharic",
                nativeName: "አማርኛ",
                flag: "🇪🇹"
            },

            {
                code: "ti",
                shortCode: "TI",
                name: "Tigrinya",
                nativeName: "ትግርኛ",
                flag: "🇪🇷"
            },

            {
                code: "hi",
                shortCode: "HI",
                name: "Hindi",
                nativeName: "हिन्दी",
                flag: "🇮🇳"
            },

            {
                code: "bn",
                shortCode: "BN",
                name: "Bengali",
                nativeName: "বাংলা",
                flag: "🇧🇩"
            },

            {
                code: "ur",
                shortCode: "UR",
                name: "Urdu",
                nativeName: "اردو",
                flag: "🇵🇰"
            },

            {
                code: "zh",
                shortCode: "ZH",
                name: "Chinese",
                nativeName: "中文",
                flag: "🇨🇳"
            },

            {
                code: "ja",
                shortCode: "JA",
                name: "Japanese",
                nativeName: "日本語",
                flag: "🇯🇵"
            },

            {
                code: "ko",
                shortCode: "KO",
                name: "Korean",
                nativeName: "한국어",
                flag: "🇰🇷"
            }

        ];


        // ========================================================
        // TRANSLATIONS
        //
        // Norwegian is the source/default language.
        //
        // Norwegian and English are translated locally.
        // Other languages temporarily fall back to Norwegian.
        // ========================================================

        const translations = {


            // ====================================================
            // NORWEGIAN
            // ====================================================

            no: {


                // =================================================
                // GENERAL / LOGIN / LANDING PAGE
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
                // RESIDENT PAGE - STATIC TEXT
                // =================================================

                residentPageTitle:
                    "Cleaning App - Min side",

                residentRole:
                    "BEBOER",

                residentWelcomeDescription:
                    "Her finner du boligen din, rengjøringsplanen og oppgavene dine.",

                loading:
                    "Laster...",

                residentLoadingDescription:
                    "Vi henter informasjonen din.",

                propertyAssociation:
                    "Boligtilknytning",

                accountActive:
                    "Kontoen din er aktiv.",

                notAssignedProperty:
                    "Du er ikke knyttet til en bolig ennå",

                notAssignedPropertyDescription:
                    "Kontoen din er opprettet, men du er ikke registrert på en bolig og etasje ennå.",

                contactAdministratorProperty:
                    "Kontakt administratoren dersom du mener dette er feil.",

                myProperty:
                    "Min bolig",

                registeredPropertyFloor:
                    "Registrert bolig og etasje",

                active:
                    "Aktiv",

                noCleaningPlanYet:
                    "Ingen rengjøringsplan ennå",

                noCleaningPlanDescription:
                    "Det er ikke opprettet en aktiv rengjøringsplan for boligen og etasjen din.",

                thisWeek:
                    "Denne uken",

                date:
                    "Dato",

                responsible:
                    "Ansvarlig",

                time:
                    "Tid",

                floor:
                    "Etasje",

                thursdayFallbackWarning:
                    "Hvis rengjøring ikke er mulig fredag, skal den utføres torsdag.",

                viewPreviousUpcomingWeeks:
                    "Se tidligere og kommende uker",

                previous:
                    "← Forrige",

                next:
                    "Neste →",

                selectedWeek:
                    "Valgt uke",

                status:
                    "Status",

                cleaningTasks:
                    "Rengjøringsoppgaver",

                noCleaningTasks:
                    "Ingen rengjøringsoppgaver er opprettet.",

                documentWork:
                    "Dokumenter arbeidet",

                documentWorkDescription:
                    "Ta minst ett nytt bilde etter at rengjøringen er utført.",

                takePhoto:
                    "Ta bilde",

                maxTenPhotos:
                    "Maks 10 bilder",

                confirmAndSign:
                    "Bekreft og signer",

                confirmAndSignDescription:
                    "Når alle oppgavene er fullført og minst ett bilde er lagt til, kan rengjøringen bekreftes.",

                signedBy:
                    "Signert av",

                week:
                    "Uke",

                confirmCleaningCompleted:
                    "Bekreft at rengjøringen er fullført",

                couldNotLoadPage:
                    "Kunne ikke laste siden.",


                // =================================================
                // RESIDENT PAGE - DYNAMIC TEXT
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

                notCompleted:
                    "Ikke fullført",

                notAvailableYet:
                    "Ikke tilgjengelig ennå",

                notYetAvailable:
                    "Ikke tilgjengelig ennå",

                open:
                    "Åpen",

                deadlinePassed:
                    "Frist utløpt",

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

                tasksCreatedByAdministrator:
                    "Oppgavene er opprettet av administrator.",

                tasksVisibleOnlyResponsibleCanComplete:
                    "Du kan se oppgavene, men bare ukens ansvarlige kan fullføre dem.",

                onlyNameCanComplete:
                    "Kun {name} kan fullføre denne uken.",

                onlyResponsibleCanConfirm:
                    "🔒 Kun ukens ansvarlige kan bekrefte rengjøringen.",

                onlyResponsibleResidentCanComplete:
                    "Bare den ansvarlige beboeren kan fullføre rengjøringen.",

                notActiveCleaningWeek:
                    "Dette er ikke den aktive rengjøringsuken.",

                tasksOnlyCurrentWeek:
                    "Oppgaver kan bare fullføres i den aktuelle uken.",

                onlyCurrentWeekCanBeCompleted:
                    "Rengjøring kan bare fullføres i den aktuelle uken.",

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
                    "✓ Rengjøringen er allerede bekreftet og signert.",

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

                takePhotoWithIcon:
                    "📷 Ta bilde",

                cleaningTask:
                    "Rengjøringsoppgave",

                couldNotSaveTaskCompletion:
                    "Kunne ikke lagre oppgaven som fullført.",

                couldNotRemoveTaskCompletion:
                    "Kunne ikke fjerne fullføringen av oppgaven.",

                responsibleOnlyForWeek:
                    "Du kan bare fullføre rengjøringen i uken du er ansvarlig.",

                unexpectedResidentPageError:
                    "Det oppstod en uventet feil ved lasting av siden.",

                errorOccurred:
                    "Det oppstod en feil.",

                cancel:
                    "Avbryt"

            },


            // ====================================================
            // ENGLISH
            // ====================================================

            en: {


                // =================================================
                // GENERAL / LOGIN / LANDING PAGE
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
                // RESIDENT PAGE - STATIC TEXT
                // =================================================

                residentPageTitle:
                    "Cleaning App - My page",

                residentRole:
                    "RESIDENT",

                residentWelcomeDescription:
                    "Here you can find your property, cleaning schedule and tasks.",

                loading:
                    "Loading...",

                residentLoadingDescription:
                    "We are loading your information.",

                propertyAssociation:
                    "Property association",

                accountActive:
                    "Your account is active.",

                notAssignedProperty:
                    "You are not assigned to a property yet",

                notAssignedPropertyDescription:
                    "Your account has been created, but you have not yet been assigned to a property and floor.",

                contactAdministratorProperty:
                    "Contact the administrator if you believe this is incorrect.",

                myProperty:
                    "My property",

                registeredPropertyFloor:
                    "Registered property and floor",

                active:
                    "Active",

                noCleaningPlanYet:
                    "No cleaning schedule yet",

                noCleaningPlanDescription:
                    "No active cleaning schedule has been created for your property and floor.",

                thisWeek:
                    "This week",

                date:
                    "Date",

                responsible:
                    "Responsible",

                time:
                    "Time",

                floor:
                    "Floor",

                thursdayFallbackWarning:
                    "If cleaning is not possible on Friday, it must be completed on Thursday.",

                viewPreviousUpcomingWeeks:
                    "View previous and upcoming weeks",

                previous:
                    "← Previous",

                next:
                    "Next →",

                selectedWeek:
                    "Selected week",

                status:
                    "Status",

                cleaningTasks:
                    "Cleaning tasks",

                noCleaningTasks:
                    "No cleaning tasks have been created.",

                documentWork:
                    "Document the work",

                documentWorkDescription:
                    "Take at least one new photo after the cleaning is completed.",

                takePhoto:
                    "Take photo",

                maxTenPhotos:
                    "Maximum 10 photos",

                confirmAndSign:
                    "Confirm and sign",

                confirmAndSignDescription:
                    "When all tasks are completed and at least one photo has been added, the cleaning can be confirmed.",

                signedBy:
                    "Signed by",

                week:
                    "Week",

                confirmCleaningCompleted:
                    "Confirm that the cleaning is completed",

                couldNotLoadPage:
                    "Could not load the page.",


                // =================================================
                // RESIDENT PAGE - DYNAMIC TEXT
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
                    "Could not load your property association.",

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
                    "Planned",

                previousWeekStatus:
                    "Previous week",

                upcoming:
                    "Upcoming",

                notCompleted:
                    "Not completed",

                notAvailableYet:
                    "Not available yet",

                notYetAvailable:
                    "Not available yet",

                open:
                    "Open",

                deadlinePassed:
                    "Deadline passed",

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

                tasksCreatedByAdministrator:
                    "The tasks were created by the administrator.",

                tasksVisibleOnlyResponsibleCanComplete:
                    "You can view the tasks, but only the resident responsible for this week can complete them.",

                onlyNameCanComplete:
                    "Only {name} can complete this week.",

                onlyResponsibleCanConfirm:
                    "🔒 Only the resident responsible for this week can confirm the cleaning.",

                onlyResponsibleResidentCanComplete:
                    "Only the responsible resident can complete the cleaning.",

                notActiveCleaningWeek:
                    "This is not the active cleaning week.",

                tasksOnlyCurrentWeek:
                    "Tasks can only be completed during the current week.",

                onlyCurrentWeekCanBeCompleted:
                    "Cleaning can only be completed during the current week.",

                selectCurrentWeekToClean:
                    "🔒 Select the current week to perform the cleaning.",

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
                    "You are responsible this week. Check off the tasks as they are completed.",

                responsibleForThisWeek:
                    "You are responsible for this week.",

                completeTasksAndPhotoBeforeSign:
                    "Complete all tasks and take at least one new photo before signing.",

                cleaningAlreadySigned:
                    "✓ The cleaning has already been confirmed and signed.",

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

                takePhotoWithIcon:
                    "📷 Take photo",

                cleaningTask:
                    "Cleaning task",

                couldNotSaveTaskCompletion:
                    "Could not save the task as completed.",

                couldNotRemoveTaskCompletion:
                    "Could not remove the task completion.",

                responsibleOnlyForWeek:
                    "You can only complete the cleaning during the week you are responsible.",

                unexpectedResidentPageError:
                    "An unexpected error occurred while loading the page.",

                errorOccurred:
                    "An error occurred.",

                cancel:
                    "Cancel"

            }

        };

        // ========================================================
        // CURRENT LANGUAGE
        // ========================================================

        let currentLanguageCode =
            localStorage.getItem(
                "cleaningAppLanguage"
            ) || "no";


        // ========================================================
        // GET LANGUAGE BY CODE
        // ========================================================

        function getLanguageByCode(
            code
        ) {

            return languages.find(
                function (
                    language
                ) {

                    return (
                        language.code ===
                        code
                    );

                }
            );

        }


        // ========================================================
        // INTERPOLATE TRANSLATION PARAMETERS
        // ========================================================

        function interpolateTranslation(
            text,
            params = {}
        ) {

            if (
                typeof text !==
                "string"
            ) {

                return text;

            }


            return text.replace(
                /\{([a-zA-Z0-9_]+)\}/g,
                function (
                    match,
                    key
                ) {

                    if (
                        Object.prototype
                            .hasOwnProperty.call(
                            params,
                            key
                        )
                    ) {

                        return String(
                            params[
                                key
                                ]
                        );

                    }


                    return match;

                }
            );

        }


        // ========================================================
        // GET TRANSLATION
        // ========================================================

        function getTranslation(
            key,
            params = {}
        ) {

            const currentTranslations =
                translations[
                    currentLanguageCode
                    ];


            /*
             * Norwegian is the fallback language.
             *
             * Languages that do not yet have their
             * own local translation package will
             * temporarily display Norwegian.
             */

            const fallbackTranslations =
                translations.no;


            let translatedText;


            // ----------------------------------------------------
            // CURRENT LANGUAGE
            // ----------------------------------------------------

            if (
                currentTranslations &&
                Object.prototype
                    .hasOwnProperty.call(
                    currentTranslations,
                    key
                )
            ) {

                translatedText =
                    currentTranslations[
                        key
                        ];

            }


                // ----------------------------------------------------
                // NORWEGIAN FALLBACK
            // ----------------------------------------------------

            else if (
                fallbackTranslations &&
                Object.prototype
                    .hasOwnProperty.call(
                    fallbackTranslations,
                    key
                )
            ) {

                translatedText =
                    fallbackTranslations[
                        key
                        ];

            }


                // ----------------------------------------------------
                // UNKNOWN TRANSLATION KEY
            // ----------------------------------------------------

            else {

                console.warn(
                    "Missing translation key:",
                    key
                );


                translatedText =
                    key;

            }


            return interpolateTranslation(
                translatedText,
                params
            );

        }


        // ========================================================
        // TRANSLATE PAGE
        // ========================================================

        function translatePage() {


            // ====================================================
            // TEXT CONTENT
            // ====================================================

            const textElements =
                document.querySelectorAll(
                    "[data-i18n]"
                );


            textElements.forEach(
                function (
                    element
                ) {

                    const key =
                        element.dataset.i18n;


                    if (!key) {

                        return;

                    }


                    element.textContent =
                        getTranslation(
                            key
                        );

                }
            );


            // ====================================================
            // PLACEHOLDERS
            // ====================================================

            const placeholderElements =
                document.querySelectorAll(
                    "[data-i18n-placeholder]"
                );


            placeholderElements.forEach(
                function (
                    element
                ) {

                    const key =
                        element.dataset
                            .i18nPlaceholder;


                    if (!key) {

                        return;

                    }


                    element.setAttribute(
                        "placeholder",
                        getTranslation(
                            key
                        )
                    );

                }
            );


            // ====================================================
            // ARIA LABELS
            // ====================================================

            const ariaLabelElements =
                document.querySelectorAll(
                    "[data-i18n-aria-label]"
                );


            ariaLabelElements.forEach(
                function (
                    element
                ) {

                    const key =
                        element.dataset
                            .i18nAriaLabel;


                    if (!key) {

                        return;

                    }


                    element.setAttribute(
                        "aria-label",
                        getTranslation(
                            key
                        )
                    );

                }
            );


            // ====================================================
            // TITLE ATTRIBUTES
            // ====================================================

            const titleElements =
                document.querySelectorAll(
                    "[data-i18n-title]"
                );


            titleElements.forEach(
                function (
                    element
                ) {

                    const key =
                        element.dataset
                            .i18nTitle;


                    if (!key) {

                        return;

                    }


                    const translatedTitle =
                        getTranslation(
                            key
                        );


                    /*
                     * <title> uses textContent.
                     *
                     * Normal HTML elements use
                     * the title attribute.
                     */

                    if (
                        element.tagName
                            .toLowerCase() ===
                        "title"
                    ) {

                        element.textContent =
                            translatedTitle;

                    } else {

                        element.setAttribute(
                            "title",
                            translatedTitle
                        );

                    }

                }
            );


            // ====================================================
            // HTML LANGUAGE ATTRIBUTE
            // ====================================================

            document.documentElement.lang =
                currentLanguageCode;


            // ====================================================
            // FALLBACK DOCUMENT TITLE
            // ====================================================

            const translatedTitleElement =
                document.querySelector(
                    "title[data-i18n-title]"
                );


            /*
             * resident.html uses data-i18n-title.
             *
             * Older login/landing pages may not,
             * so keep a safe fallback.
             */

            if (
                !translatedTitleElement
            ) {

                if (
                    currentLanguageCode ===
                    "en"
                ) {

                    document.title =
                        "Cleaning App - Log in";

                } else {

                    document.title =
                        "Cleaning App - Logg inn";

                }

            }

        }


        // ========================================================
        // UPDATE HEADER LANGUAGE BUTTON
        // ========================================================

        function updateLanguageButton() {

            const language =
                getLanguageByCode(
                    currentLanguageCode
                );


            /*
             * Invalid or old language code
             * stored in localStorage.
             */

            if (!language) {

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

        }


        // ========================================================
        // OPEN LANGUAGE MODAL
        // ========================================================

        function openLanguageModal() {

            if (!languageModal) {

                return;

            }


            languageModal.hidden =
                false;


            if (languageButton) {

                languageButton.setAttribute(
                    "aria-expanded",
                    "true"
                );

            }


            renderLanguages();


            /*
             * Focus search after the modal
             * has become visible.
             */

            setTimeout(
                function () {

                    if (
                        languageSearchInput
                    ) {

                        languageSearchInput
                            .focus();

                    }

                },
                0
            );

        }


        // ========================================================
        // CLOSE LANGUAGE MODAL
        // ========================================================

        function closeLanguageModal() {

            if (!languageModal) {

                return;

            }


            languageModal.hidden =
                true;


            if (languageButton) {

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

            if (!languageModal) {

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
                (
                    language.code ===
                    currentLanguageCode
                );


            button.setAttribute(
                "aria-selected",
                isSelected
                    ? "true"
                    : "false"
            );


            if (isSelected) {

                button.classList.add(
                    "active"
                );

            }


            // ====================================================
            // FLAG
            // ====================================================

            const flag =
                document.createElement(
                    "span"
                );


            flag.className =
                "language-item-flag";


            flag.textContent =
                language.flag;


            // ====================================================
            // LANGUAGE CODE
            // ====================================================

            const code =
                document.createElement(
                    "span"
                );


            code.className =
                "language-item-code";


            code.textContent =
                language.shortCode;


            // ====================================================
            // SELECTED CHECK
            // ====================================================

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


            // ====================================================
            // BUILD ITEM
            // ====================================================

            button.appendChild(
                flag
            );


            button.appendChild(
                code
            );


            button.appendChild(
                check
            );


            // ====================================================
            // SELECT LANGUAGE
            // ====================================================

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


            if (!searchValue) {

                return languages;

            }


            return languages.filter(
                function (
                    language
                ) {

                    /*
                     * Search using:
                     *
                     * - language code
                     * - short code
                     * - English language name
                     * - native language name
                     */

                    const searchableText =
                        [
                            language.code,
                            language.shortCode,
                            language.name,
                            language.nativeName
                        ]
                            .join(" ")
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

            if (!languageList) {

                return;

            }


            const filteredLanguages =
                getFilteredLanguages();


            languageList.innerHTML =
                "";


            // ====================================================
            // RESULT COUNT
            // ====================================================

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


            // ====================================================
            // EMPTY RESULT
            // ====================================================

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


                /*
                 * Search field may still contain
                 * text, so keep the clear button
                 * available.
                 */

                if (
                    clearLanguageSearchButton &&
                    languageSearchInput
                ) {

                    clearLanguageSearchButton.hidden =
                        (
                            languageSearchInput
                                .value
                                .trim()
                                .length ===
                            0
                        );

                }


                return;

            }


            languageList.hidden =
                false;


            if (
                languageSearchEmpty
            ) {

                languageSearchEmpty.hidden =
                    true;

            }


            // ====================================================
            // LANGUAGE ITEMS
            // ====================================================

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


            // ====================================================
            // CLEAR SEARCH BUTTON
            // ====================================================

            if (
                clearLanguageSearchButton &&
                languageSearchInput
            ) {

                clearLanguageSearchButton.hidden =
                    (
                        languageSearchInput
                            .value
                            .trim()
                            .length ===
                        0
                    );

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


            if (!language) {

                console.warn(
                    "Unknown language:",
                    languageCode
                );


                return;

            }


            currentLanguageCode =
                language.code;


            // ====================================================
            // SAVE LANGUAGE
            // ====================================================

            localStorage.setItem(
                "cleaningAppLanguage",
                currentLanguageCode
            );


            // ====================================================
            // UPDATE HEADER BUTTON
            // ====================================================

            updateLanguageButton();


            // ====================================================
            // TRANSLATE STATIC PAGE
            // ====================================================

            translatePage();


            // ====================================================
            // RESET LANGUAGE SEARCH
            // ====================================================

            if (
                languageSearchInput
            ) {

                languageSearchInput.value =
                    "";

            }


            // ====================================================
            // UPDATE LANGUAGE LIST
            // ====================================================

            renderLanguages();


            // ====================================================
            // CLOSE LANGUAGE MODAL
            // ====================================================

            closeLanguageModal();


            // ====================================================
            // NOTIFY OTHER JS FILES
            //
            // IMPORTANT:
            //
            // resident.js listens for this exact event:
            //
            // cleanplan:languagechange
            //
            // Dynamic content can therefore be rerendered
            // immediately without reloading the page.
            // ====================================================

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


            console.log(
                "Selected language:",
                language.code
            );

        }


        // ========================================================
        // LANGUAGE BUTTON
        // ========================================================

        if (languageButton) {

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
        // LANGUAGE SEARCH
        // ========================================================

        if (
            languageSearchInput
        ) {

            languageSearchInput
                .addEventListener(
                    "input",
                    function () {

                        renderLanguages();

                    }
                );


            /*
             * Do not let the document click
             * handler close the language modal
             * while the resident is searching.
             */

            languageSearchInput
                .addEventListener(
                    "click",
                    function (
                        event
                    ) {

                        event.stopPropagation();

                    }
                );

        }


        // ========================================================
        // CLEAR LANGUAGE SEARCH
        // ========================================================

        if (
            clearLanguageSearchButton
        ) {

            clearLanguageSearchButton
                .addEventListener(
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


                        languageSearchInput
                            .focus();

                    }
                );

        }


        // ========================================================
        // DO NOT CLOSE WHEN CLICKING INSIDE LANGUAGE SELECTOR
        // ========================================================

        if (
            languageSelector
        ) {

            languageSelector
                .addEventListener(
                    "click",
                    function (
                        event
                    ) {

                        event.stopPropagation();

                    }
                );

        }


        // ========================================================
        // CLOSE WHEN CLICKING OUTSIDE
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
        // ESCAPE KEY
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
        // PUBLIC LANGUAGE API
        //
        // Other JavaScript files can use:
        //
        // window.CleanPlanI18n.t(...)
        // window.CleanPlanI18n.getLanguage()
        // window.CleanPlanI18n.applyTranslations()
        // window.CleanPlanI18n.setLanguage(...)
        //
        // Keep this API globally available.
        // ========================================================

        window.CleanPlanI18n = {


            // ====================================================
            // GET CURRENT LANGUAGE
            // ====================================================

            getLanguage:
                function () {

                    return (
                        currentLanguageCode
                    );

                },


            // ====================================================
            // GET TRANSLATION
            // ====================================================

            t:
                function (
                    key,
                    params = {}
                ) {

                    return getTranslation(
                        key,
                        params
                    );

                },


            // ====================================================
            // APPLY STATIC TRANSLATIONS
            // ====================================================

            applyTranslations:
                function () {

                    translatePage();

                },


            // ====================================================
            // SET LANGUAGE
            // ====================================================

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
        // BACKWARD COMPATIBILITY API
        //
        // Older pages may still use:
        //
        // window.cleanPlanLanguage
        //
        // Keep this available so existing pages do not break.
        // ========================================================

        window.cleanPlanLanguage =
            window.CleanPlanI18n;


        // ========================================================
        // LEGACY METHOD NAMES
        // ========================================================

        window.cleanPlanLanguage
            .getCurrentLanguage =
            function () {

                return (
                    currentLanguageCode
                );

            };


        window.cleanPlanLanguage
            .getTranslation =
            function (
                key,
                params = {}
            ) {

                return getTranslation(
                    key,
                    params
                );

            };


        window.cleanPlanLanguage
            .translatePage =
            function () {

                translatePage();

            };


        // ========================================================
        // VALIDATE STORED LANGUAGE
        // ========================================================

        /*
         * Validate the language code stored
         * in localStorage.
         *
         * This protects the page if an old,
         * removed or invalid language code
         * exists in the browser.
         */

        if (
            !getLanguageByCode(
                currentLanguageCode
            )
        ) {

            currentLanguageCode =
                "no";


            localStorage.setItem(
                "cleaningAppLanguage",
                currentLanguageCode
            );

        }


        // ========================================================
        // INITIALIZE LANGUAGE BUTTON
        // ========================================================

        updateLanguageButton();


        // ========================================================
        // TRANSLATE CURRENT PAGE
        // ========================================================

        translatePage();


        // ========================================================
        // RENDER LANGUAGE LIST
        // ========================================================

        renderLanguages();


        // ========================================================
        // LANGUAGE SYSTEM READY
        // ========================================================

        console.log(
            "CleanPlan language system ready:",
            currentLanguageCode
        );


    }
);