// ============================================================
// CLEANING APP
// LANGUAGE SELECTOR
// ============================================================


document.addEventListener(
    "DOMContentLoaded",
    function () {

        // ====================================================
        // DOM ELEMENTS
        // ====================================================

        const languageButton =
            document.getElementById("languageButton");

        const languageModal =
            document.getElementById("languageModal");

        const languageSearchInput =
            document.getElementById("languageSearchInput");

        const clearLanguageSearchButton =
            document.getElementById(
                "clearLanguageSearchButton"
            );

        const languageList =
            document.getElementById("languageList");

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


        // ====================================================
        // LANGUAGES
        // Temporary local list.
        // Later this will come from our translation API.
        // ====================================================

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


        // ====================================================
        // CURRENT LANGUAGE
        // ====================================================

        let currentLanguageCode =
            localStorage.getItem(
                "cleaningAppLanguage"
            ) || "no";


        // ====================================================
        // GET LANGUAGE
        // ====================================================

        function getLanguageByCode(code) {

            return languages.find(
                function (language) {

                    return language.code === code;

                }
            );

        }


        // ====================================================
        // UPDATE HEADER BUTTON
        // ====================================================

        function updateLanguageButton() {

            const language =
                getLanguageByCode(
                    currentLanguageCode
                );

            if (!language) {

                currentLanguageCode = "no";

                localStorage.setItem(
                    "cleaningAppLanguage",
                    "no"
                );

                updateLanguageButton();

                return;

            }


            if (selectedLanguageName) {

                selectedLanguageName.textContent =
                    language.shortCode;

            }


            document.documentElement.lang =
                language.code;

        }


        // ====================================================
        // OPEN LANGUAGE DROPDOWN
        // ====================================================

        function openLanguageModal() {

            if (!languageModal) {
                return;
            }


            languageModal.hidden = false;


            if (languageButton) {

                languageButton.setAttribute(
                    "aria-expanded",
                    "true"
                );

            }


            renderLanguages();


            setTimeout(
                function () {

                    if (languageSearchInput) {

                        languageSearchInput.focus();

                    }

                },
                0
            );

        }


        // ====================================================
        // CLOSE LANGUAGE DROPDOWN
        // ====================================================

        function closeLanguageModal() {

            if (!languageModal) {
                return;
            }


            languageModal.hidden = true;


            if (languageButton) {

                languageButton.setAttribute(
                    "aria-expanded",
                    "false"
                );

            }

        }


        // ====================================================
        // TOGGLE LANGUAGE DROPDOWN
        // ====================================================

        function toggleLanguageModal() {

            if (!languageModal) {
                return;
            }


            if (languageModal.hidden) {

                openLanguageModal();

            } else {

                closeLanguageModal();

            }

        }


        // ====================================================
        // CREATE LANGUAGE ROW
        // ====================================================
        function createLanguageItem(language) {

            const button =
                document.createElement("button");

            button.type = "button";
            button.className = "language-item";

            button.dataset.languageCode =
                language.code;

            button.setAttribute(
                "role",
                "option"
            );


            const isSelected =
                language.code === currentLanguageCode;


            button.setAttribute(
                "aria-selected",
                isSelected
                    ? "true"
                    : "false"
            );


            if (isSelected) {

                button.classList.add("active");

            }


            const flag =
                document.createElement("span");

            flag.className =
                "language-item-flag";

            flag.textContent =
                language.flag;


            const code =
                document.createElement("span");

            code.className =
                "language-item-code";

            code.textContent =
                language.shortCode;


            const check =
                document.createElement("span");

            check.className =
                "language-item-check";

            check.textContent =
                isSelected
                    ? "✓"
                    : "";


            button.appendChild(flag);
            button.appendChild(code);
            button.appendChild(check);


            // ========================================================
            // SELECT LANGUAGE
            // ========================================================

            button.addEventListener(
                "click",
                function (event) {

                    event.preventDefault();
                    event.stopPropagation();

                    console.log(
                        "Language clicked:",
                        language.code
                    );

                    selectLanguage(
                        language.code
                    );

                }
            );


            return button;

        }

        // ====================================================
        // FILTER LANGUAGES
        // ====================================================

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
                function (language) {

                    const searchableText =
                        [
                            language.code,
                            language.shortCode,
                            language.name,
                            language.nativeName
                        ]
                            .join(" ")
                            .toLowerCase();


                    return searchableText.includes(
                        searchValue
                    );

                }
            );

        }


        // ====================================================
        // RENDER LANGUAGES
        // ====================================================

        function renderLanguages() {

            if (!languageList) {
                return;
            }


            const filteredLanguages =
                getFilteredLanguages();


            languageList.innerHTML = "";


            if (languageResultText) {

                languageResultText.textContent =
                    filteredLanguages.length +
                    (
                        filteredLanguages.length === 1
                            ? " språk"
                            : " språk"
                    );

            }


            if (
                filteredLanguages.length === 0
            ) {

                languageList.hidden = true;


                if (languageSearchEmpty) {

                    languageSearchEmpty.hidden =
                        false;

                }

                return;

            }


            languageList.hidden = false;


            if (languageSearchEmpty) {

                languageSearchEmpty.hidden =
                    true;

            }


            filteredLanguages.forEach(
                function (language) {

                    languageList.appendChild(
                        createLanguageItem(
                            language
                        )
                    );

                }
            );


            if (
                clearLanguageSearchButton &&
                languageSearchInput
            ) {

                clearLanguageSearchButton.hidden =
                    languageSearchInput
                        .value
                        .trim()
                        .length === 0;

            }

        }


        // ====================================================
        // SELECT LANGUAGE
        // ====================================================

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


            localStorage.setItem(
                "cleaningAppLanguage",
                currentLanguageCode
            );


            updateLanguageButton();


            if (languageSearchInput) {

                languageSearchInput.value =
                    "";

            }


            renderLanguages();

            closeLanguageModal();


            console.log(
                "Selected language:",
                language.code
            );

        }


        // ====================================================
        // LANGUAGE BUTTON
        // ====================================================

        if (languageButton) {

            languageButton.addEventListener(
                "click",
                function (event) {

                    event.preventDefault();

                    event.stopPropagation();

                    toggleLanguageModal();

                }
            );

        }


        // ====================================================
        // LANGUAGE LIST
        // Event delegation makes all language rows clickable.
        // ====================================================


        // ====================================================
        // SEARCH
        // ====================================================

        if (languageSearchInput) {

            languageSearchInput.addEventListener(
                "input",
                function () {

                    renderLanguages();

                }
            );


            languageSearchInput.addEventListener(
                "click",
                function (event) {

                    event.stopPropagation();

                }
            );

        }


        // ====================================================
        // CLEAR SEARCH
        // ====================================================

        if (clearLanguageSearchButton) {

            clearLanguageSearchButton.addEventListener(
                "click",
                function (event) {

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


        // ====================================================
        // DO NOT CLOSE WHEN CLICKING INSIDE SELECTOR
        // ====================================================

        if (languageSelector) {

            languageSelector.addEventListener(
                "click",
                function (event) {

                    event.stopPropagation();

                }
            );

        }


        // ====================================================
        // CLICK OUTSIDE
        // ====================================================

        document.addEventListener(
            "click",
            function (event) {

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


        // ====================================================
        // ESCAPE
        // ====================================================

        document.addEventListener(
            "keydown",
            function (event) {

                if (
                    event.key === "Escape"
                ) {

                    closeLanguageModal();

                }

            }
        );


        // ====================================================
        // INITIALIZE
        // ====================================================

        updateLanguageButton();

        renderLanguages();

    }
);