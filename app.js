/* =========================================================
   DIGITAL HORIZONS AI
   MAIN JAVASCRIPT
   Language / Contact / Legal / Navigation
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       LANGUAGE MENU
    ===================================================== */

    const languageButton =
        document.getElementById("languageButton");

    const languageMenu =
        document.getElementById("languageMenu");

    const languageButtons =
        document.querySelectorAll(
            ".language-menu button[data-lang]"
        );


    /* =====================================================
       SUPPORTED LANGUAGES
    ===================================================== */

    const supportedLanguages = [
        "de",
        "en",
        "fr",
        "es",
        "it",
        "pt",
        "nl",
        "da",
        "sv",
        "no",
        "fi",
        "pl",
        "cs",
        "sk",
        "hu",
        "ro",
        "bg",
        "el",
        "tr",
        "ru",
        "uk",
        "ar",
        "he",
        "fa",
        "hi",
        "bn",
        "ur",
        "zh-CN",
        "ja",
        "ko",
        "vi",
        "th",
        "id"
    ];


    /* =====================================================
       LANGUAGE MENU OPEN / CLOSE
    ===================================================== */

    if (languageButton && languageMenu) {

        languageButton.addEventListener(
            "click",
            (event) => {

                event.stopPropagation();

                const opened =
                    languageMenu.classList.toggle("open");

                languageButton.setAttribute(
                    "aria-expanded",
                    opened ? "true" : "false"
                );
            }
        );


        document.addEventListener(
            "click",
            (event) => {

                if (
                    !languageMenu.contains(event.target) &&
                    !languageButton.contains(event.target)
                ) {

                    languageMenu.classList.remove("open");

                    languageButton.setAttribute(
                        "aria-expanded",
                        "false"
                    );
                }
            }
        );
    }


    /* =====================================================
       GOOGLE TRANSLATE CLEANUP
       
       Google Translate sometimes adds:
       - top banner
       - iframe
       - body top offset
       - Google classes

       We remove/hide these automatically.
    ===================================================== */

    function removeGoogleTranslateBar() {

        document.body.style.top = "0px";

        document.documentElement.style.top = "0px";

        document.documentElement.classList.remove(
            "translated-ltr",
            "translated-rtl"
        );


        const googleFrames =
            document.querySelectorAll(
                ".goog-te-banner-frame, " +
                ".goog-te-balloon-frame, " +
                ".goog-te-menu-frame"
            );

        googleFrames.forEach((frame) => {

            frame.style.display = "none";
            frame.style.visibility = "hidden";
            frame.style.height = "0";
            frame.style.width = "0";
        });


        const allIframes =
            document.querySelectorAll("iframe");

        allIframes.forEach((iframe) => {

            const title =
                (
                    iframe.getAttribute("title") ||
                    ""
                ).toLowerCase();

            const src =
                (
                    iframe.getAttribute("src") ||
                    ""
                ).toLowerCase();

            if (
                title.includes("google translate") ||
                src.includes("translate.google")
            ) {

                iframe.style.display = "none";
                iframe.style.visibility = "hidden";
                iframe.style.height = "0";
                iframe.style.width = "0";
                iframe.style.border = "0";
            }
        });
    }


    /* =====================================================
       EXTRA CSS TO HIDE GOOGLE BAR
       
       This protects the website even when Google changes
       the generated iframe/class names.
    ===================================================== */

    const googleFixStyle =
        document.createElement("style");

    googleFixStyle.id =
        "digital-horizons-google-fix";

    googleFixStyle.textContent = `

        .goog-te-banner-frame,
        .goog-te-balloon-frame,
        .goog-te-menu-frame,
        iframe.goog-te-banner-frame,
        body > .skiptranslate {
            display: none !important;
            visibility: hidden !important;
            height: 0 !important;
            max-height: 0 !important;
            border: 0 !important;
        }

        html,
        body {
            top: 0 !important;
        }

        body {
            position: static !important;
        }

        .goog-tooltip,
        .goog-tooltip:hover {
            display: none !important;
        }

        .goog-text-highlight {
            background: transparent !important;
            box-shadow: none !important;
        }

    `;

    document.head.appendChild(
        googleFixStyle
    );


    /* =====================================================
       GOOGLE TRANSLATE INITIALIZATION
    ===================================================== */

    window.googleTranslateElementInit =
        function () {

            if (
                !window.google ||
                !google.translate
            ) {
                return;
            }


            new google.translate.TranslateElement(
                {
                    pageLanguage: "de",

                    includedLanguages:
                        supportedLanguages.join(","),

                    autoDisplay: false,

                    multilanguagePage: true
                },

                "google_translate_element"
            );


            /*
             * Google needs a short moment to create
             * its hidden language selector.
             */

            let checks = 0;

            const cleanupTimer =
                setInterval(
                    () => {

                        checks++;

                        removeGoogleTranslateBar();

                        if (checks >= 30) {

                            clearInterval(
                                cleanupTimer
                            );
                        }

                    },
                    200
                );
        };


    /* =====================================================
       LOAD GOOGLE TRANSLATE
    ===================================================== */

    if (
        !document.querySelector(
            'script[data-digital-horizons-translate="true"]'
        )
    ) {

        const googleScript =
            document.createElement("script");

        googleScript.src =
            "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";

        googleScript.async = true;

        googleScript.setAttribute(
            "data-digital-horizons-translate",
            "true"
        );

        document.head.appendChild(
            googleScript
        );
    }


    /* =====================================================
       RTL LANGUAGE HANDLING
    ===================================================== */

    function applyDirection(lang) {

        const rtlLanguages = [
            "ar",
            "he",
            "fa",
            "ur"
        ];

        if (
            rtlLanguages.includes(lang)
        ) {

            document.documentElement.dir =
                "rtl";

            document.documentElement.lang =
                lang;

        } else {

            document.documentElement.dir =
                "ltr";

            document.documentElement.lang =
                lang;
        }
    }


    /* =====================================================
       GOOGLE TRANSLATE SELECTOR
    ===================================================== */

    function getGoogleLanguageSelector() {

        return document.querySelector(
            ".goog-te-combo"
        );
    }


    /* =====================================================
       CHANGE GOOGLE LANGUAGE
    ===================================================== */

    function selectGoogleLanguage(lang) {

        const combo =
            getGoogleLanguageSelector();

        if (!combo) {
            return false;
        }


        /*
         * Google Translate uses its own <select>.
         */

        combo.value = lang;


        combo.dispatchEvent(
            new Event(
                "change",
                {
                    bubbles: true
                }
            )
        );


        removeGoogleTranslateBar();

        return true;
    }


    /* =====================================================
       GOOGLE TRANSLATE COOKIE
       
       Used as fallback when Google has not created
       the selector yet.
    ===================================================== */

    function setGoogleLanguageCookie(lang) {

        const sourceLanguage = "de";

        document.cookie =
            `googtrans=/${sourceLanguage}/${lang}; path=/`;

        document.cookie =
            `googtrans=/${sourceLanguage}/${lang}; path=/; SameSite=Lax`;
    }


    /* =====================================================
       CLEAR GOOGLE LANGUAGE
       
       Used when returning to German.
    ===================================================== */

    function clearGoogleLanguageCookie() {

        document.cookie =
            "googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

        document.cookie =
            "googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; SameSite=Lax";
    }


    /* =====================================================
       APPLY LANGUAGE
    ===================================================== */

    function applyLanguage(lang) {

        if (
            !supportedLanguages.includes(lang)
        ) {
            return;
        }


        applyDirection(lang);


        /* -----------------------------------------------
           GERMAN = ORIGINAL WEBSITE LANGUAGE
        ------------------------------------------------ */

        if (lang === "de") {

            clearGoogleLanguageCookie();

            removeGoogleTranslateBar();

            /*
             * Returning to original language requires
             * Google to restore the original DOM.
             */

            window.location.reload();

            return;
        }


        /* -----------------------------------------------
           TRY IMMEDIATE TRANSLATION
        ------------------------------------------------ */

        if (
            selectGoogleLanguage(lang)
        ) {

            removeGoogleTranslateBar();

            return;
        }


        /* -----------------------------------------------
           GOOGLE SELECTOR NOT READY YET
        ------------------------------------------------ */

        setGoogleLanguageCookie(lang);


        let attempts = 0;

        const translationTimer =
            setInterval(
                () => {

                    attempts++;

                    removeGoogleTranslateBar();


                    if (
                        selectGoogleLanguage(lang)
                    ) {

                        clearInterval(
                            translationTimer
                        );

                        return;
                    }


                    /*
                     * If Google has not loaded after
                     * several attempts, reload once.
                     */

                    if (
                        attempts >= 20
                    ) {

                        clearInterval(
                            translationTimer
                        );

                        window.location.reload();
                    }

                },
                250
            );
    }


    /* =====================================================
       LANGUAGE BUTTONS
    ===================================================== */

    languageButtons.forEach(
        (button) => {

            button.addEventListener(
                "click",
                () => {

                    const lang =
                        button.dataset.lang;


                    const languageName =
                        button.textContent.trim();


                    /* Update visible language button */

                    if (
                        languageButton
                    ) {

                        languageButton.innerHTML =
                            `${languageName} <span>▾</span>`;
                    }


                    /* Close language menu */

                    if (
                        languageMenu
                    ) {

                        languageMenu.classList.remove(
                            "open"
                        );

                        languageButton?.setAttribute(
                            "aria-expanded",
                            "false"
                        );
                    }


                    /* Apply selected language */

                    if (
                        supportedLanguages.includes(
                            lang
                        )
                    ) {

                        applyLanguage(
                            lang
                        );
                    }

                }
            );
        }
    );


    /* =====================================================
       KEEP GOOGLE BAR HIDDEN
       
       This observer watches for Google Translate
       inserting its banner after translation.
    ===================================================== */

    const googleObserver =
        new MutationObserver(
            () => {

                removeGoogleTranslateBar();

            }
        );


    googleObserver.observe(
        document.documentElement,
        {
            childList: true,
            subtree: true
        }
    );


    /* =====================================================
       CONTACT WORD COUNTER
    ===================================================== */

    const message =
        document.getElementById(
            "message"
        );

    const wordCount =
        document.getElementById(
            "wordCount"
        );


    if (
        message &&
        wordCount
    ) {

        message.addEventListener(
            "input",
            () => {

                let text =
                    message.value.trim();

                let words =
                    text
                        ? text.split(/\s+/).length
                        : 0;


                /* Maximum 500 words */

                if (
                    words > 500
                ) {

                    const limitedWords =
                        text
                            .split(/\s+/)
                            .slice(0, 500)
                            .join(" ");

                    message.value =
                        limitedWords;

                    words = 500;
                }


                wordCount.textContent =
                    words;
            }
        );
    }


    /* =====================================================
       CONTACT FORM
    ===================================================== */

    const contactForm =
        document.getElementById(
            "contactForm"
        );

    const successModal =
        document.getElementById(
            "successModal"
        );


    if (
        contactForm
    ) {

        contactForm.addEventListener(
            "submit",
            (event) => {

                event.preventDefault();


                const subjectElement =
                    document.getElementById(
                        "subject"
                    );

                const messageElement =
                    document.getElementById(
                        "message"
                    );

                const emailElement =
                    document.getElementById(
                        "email"
                    );


                const subject =
                    subjectElement
                        ? subjectElement.value.trim()
                        : "";


                const messageValue =
                    messageElement
                        ? messageElement.value.trim()
                        : "";


                const email =
                    emailElement
                        ? emailElement.value.trim()
                        : "";


                /* Required fields */

                if (
                    !subject ||
                    !messageValue ||
                    !email
                ) {

                    alert(
                        "Bitte füllen Sie alle Felder aus."
                    );

                    return;
                }


                /* Word limit */

                const words =
                    messageValue
                        .split(/\s+/)
                        .filter(Boolean);


                if (
                    words.length > 500
                ) {

                    alert(
                        "Die Nachricht darf maximal 500 Wörter enthalten."
                    );

                    return;
                }


                /* Company emails */

                const recipients =
                    "contact@nexoraonline.de,info@nexoraonline.de";


                /* Email subject */

                const emailSubject =
                    encodeURIComponent(
                        subject
                    );


                /* Email body */

                const emailBody =
                    encodeURIComponent(

                        "Neue Nachricht über digital-horizons.ai\n\n" +

                        "Absender: " +
                        email +
                        "\n\n" +

                        "Betreff:\n" +
                        subject +
                        "\n\n" +

                        "Nachricht:\n" +
                        messageValue +
                        "\n\n" +

                        "Website:\n" +
                        window.location.href
                    );


                /* Mailto */

                const mailtoUrl =
                    `mailto:${recipients}?subject=${emailSubject}&body=${emailBody}`;


                window.location.href =
                    mailtoUrl;


                /* Reset */

                contactForm.reset();


                if (
                    wordCount
                ) {

                    wordCount.textContent =
                        "0";
                }


                /* Success modal */

                if (
                    successModal
                ) {

                    successModal.classList.add(
                        "open"
                    );

                    successModal.setAttribute(
                        "aria-hidden",
                        "false"
                    );

                    document.body.classList.add(
                        "modal-open"
                    );


                    setTimeout(
                        () => {

                            successModal.classList.remove(
                                "open"
                            );

                            successModal.setAttribute(
                                "aria-hidden",
                                "true"
                            );

                            document.body.classList.remove(
                                "modal-open"
                            );

                        },
                        4000
                    );
                }

            }
        );
    }


    /* =====================================================
       LEGAL MODALS
    ===================================================== */

    const legalModal =
        document.getElementById(
            "legalModal"
        );

    const legalContent =
        document.getElementById(
            "legalContent"
        );

    const legalClose =
        document.getElementById(
            "legalClose"
        );


    /*
     * IMPORTANT:
     * Keep your existing legal texts in this object.
     * The translation system above is independent from
     * the legal modal system.
     */

    const legalTexts = {

        impressum: `
            <h2>Impressum</h2>

            <h3>Angaben zum Anbieter</h3>

            <p>
                <strong>
                    Digital Horizons UG (haftungsbeschränkt)
                </strong>
            </p>

            <p>
                Bitte verwenden Sie hier Ihre bereits
                vorhandenen Anbieter- und Kontaktdaten.
            </p>

            <h3>Kontakt</h3>

            <p>
                E-Mail:
                <a href="mailto:contact@nexoraonline.de">
                    contact@nexoraonline.de
                </a>
            </p>

            <p>
                Info:
                <a href="mailto:info@nexoraonline.de">
                    info@nexoraonline.de
                </a>
            </p>
        `,


        privacy: `
            <h2>Datenschutz (DSGVO)</h2>

            <p>
                Der Schutz personenbezogener Daten ist ein
                wichtiger Bestandteil unseres digitalen Angebots.
            </p>

            <h3>Personenbezogene Daten</h3>

            <p>
                Personenbezogene Daten werden nur verarbeitet,
                soweit dies für die Bereitstellung unserer
                digitalen Dienste oder aufgrund einer
                gesetzlichen Grundlage erforderlich ist.
            </p>

            <h3>Kontaktformular</h3>

            <p>
                Die über das Kontaktformular eingegebenen
                Informationen werden zur Bearbeitung der
                jeweiligen Anfrage verwendet.
            </p>

            <h3>Kontakt-E-Mail</h3>

            <p>
                Für Kontaktanfragen stehen folgende
                E-Mail-Adressen zur Verfügung:
            </p>

            <p>
                <a href="mailto:contact@nexoraonline.de">
                    contact@nexoraonline.de
                </a>
                <br>
                <a href="mailto:info@nexoraonline.de">
                    info@nexoraonline.de
                </a>
            </p>

            <h3>Ihre Rechte</h3>

            <p>
                Betroffene Personen haben nach Maßgabe
                der DSGVO unter anderem Rechte auf Auskunft,
                Berichtigung, Löschung und Einschränkung
                der Verarbeitung.
            </p>
        `,


        terms: `
            <h2>Nutzungsbedingungen (AGB)</h2>

            <p>
                Die Nutzung dieser Website erfolgt auf Grundlage
                der jeweils geltenden gesetzlichen Bestimmungen.
            </p>

            <h3>Nutzung der Inhalte</h3>

            <p>
                Inhalte dieser Website dürfen nicht ohne
                entsprechende Zustimmung vervielfältigt,
                verändert oder kommerziell genutzt werden,
                soweit gesetzlich nichts anderes vorgesehen ist.
            </p>

            <h3>Externe Plattformen</h3>

            <p>
                Links zu externen Plattformen führen zu
                eigenständigen Internetangeboten.
                Für deren Inhalte und Datenschutzbestimmungen
                gelten die jeweiligen Betreiberbedingungen.
            </p>
        `
    };


    /* =====================================================
       OPEN LEGAL MODALS
    ===================================================== */

    document
        .querySelectorAll(
            ".legal-button"
        )
        .forEach(
            (button) => {

                button.addEventListener(
                    "click",
                    () => {

                        const type =
                            button.dataset.legal;


                        if (
                            legalContent &&
                            legalModal &&
                            legalTexts[type]
                        ) {

                            legalContent.innerHTML =
                                legalTexts[type];


                            legalModal.classList.add(
                                "open"
                            );


                            legalModal.setAttribute(
                                "aria-hidden",
                                "false"
                            );


                            document.body.classList.add(
                                "modal-open"
                            );
                        }

                    }
                );
            }
        );


    /* =====================================================
       CLOSE LEGAL MODAL
    ===================================================== */

    function closeLegalModal() {

        if (
            !legalModal
        ) {
            return;
        }


        legalModal.classList.remove(
            "open"
        );


        legalModal.setAttribute(
            "aria-hidden",
            "true"
        );


        document.body.classList.remove(
            "modal-open"
        );
    }


    if (
        legalClose
    ) {

        legalClose.addEventListener(
            "click",
            closeLegalModal
        );
    }


    if (
        legalModal
    ) {

        legalModal.addEventListener(
            "click",
            (event) => {

                if (
                    event.target ===
                    legalModal
                ) {

                    closeLegalModal();
                }
            }
        );
    }


    /* =====================================================
       ESCAPE KEY
    ===================================================== */

    document.addEventListener(
        "keydown",
        (event) => {

            if (
                event.key === "Escape"
            ) {

                closeLegalModal();


                if (
                    successModal
                ) {

                    successModal.classList.remove(
                        "open"
                    );

                    successModal.setAttribute(
                        "aria-hidden",
                        "true"
                    );

                    document.body.classList.remove(
                        "modal-open"
                    );
                }
            }
        }
    );


    /* =====================================================
       INTERNAL NAVIGATION
    ===================================================== */

    document
        .querySelectorAll(
            'a[href^="#"]'
        )
        .forEach(
            (link) => {

                link.addEventListener(
                    "click",
                    (event) => {

                        const targetId =
                            link.getAttribute(
                                "href"
                            );


                        if (
                            targetId === "#" ||
                            targetId === "#!"
                        ) {
                            return;
                        }


                        const target =
                            document.querySelector(
                                targetId
                            );


                        if (
                            target
                        ) {

                            event.preventDefault();


                            target.scrollIntoView(
                                {
                                    behavior: "smooth",
                                    block: "start"
                                }
                            );
                        }

                    }
                );
            }
        );


    /* =====================================================
       FINAL GOOGLE CLEANUP
    ===================================================== */

    removeGoogleTranslateBar();

});
