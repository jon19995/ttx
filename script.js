window.addEventListener("DOMContentLoaded", () => {
    // Плавная прокрутка к якорям
    const anchors = document.querySelectorAll('a[href*="#"]');

    for (let anchor of anchors) {
        anchor.addEventListener("click", function (e) {
            e.preventDefault();

            const blockID = anchor.getAttribute("href").substr(1);

            document.getElementById(blockID).scrollIntoView({
                behavior: "smooth",
                block: "start",
            });
        });
    }

    // закрытие модалки:
    function closeModal(modal) {
        modal.addEventListener("click", (e) => {
            e.target.style.display = "none";
        });

        window.addEventListener("keydown", (e) => {
            if (e.code === "Escape") {
                modal.style.display = "none";
            }
        });

        modal
            .querySelector(".modal__content")
            .addEventListener("click", (e) => e.stopPropagation());
    }

    // открытие модалки:
    function openModal(btn) {
        btn.addEventListener("click", (e) => {
            const brnAtribute = e.target.getAttribute("data-modal");

            if (brnAtribute) {
                const modal = document.querySelector(`#${brnAtribute}`);

                if (modal) {
                    modal.style.display = "flex";
                }
            }
        });
    }

    // Submit модалки:
    function submitModal(modal) {
        modal.addEventListener("submit", async (e) => {
            e.preventDefault();
            const message = e.target
                .querySelector("button[type='submit']")
                .getAttribute("data-message");

            $.ajax({
                type: "POST",
                url: "mailer/smart.php",
                data: $(this).serialize(),
            }).done(function () {
                $(this).find("input").val("");
                $("#consultation, #order").fadeOut();
                $(".overlay, #mini").fadeIn("slow");

                $("form").trigger("reset");
            });
            return false;
        });

        // password - efbrxcxjkypovshq
    }

    // Работа с модальными окнами

    const modals = document.querySelectorAll(".modal__wrapper");
    const btnsToOpenDiagnosticModal = document.querySelectorAll("button");

    //При нажатии кнопки находится нужная модалка и открывается
    Array.prototype.forEach.call(btnsToOpenDiagnosticModal, openModal);

    //события закрытия модальных окон
    Array.prototype.forEach.call(modals, closeModal);

    //события отправки формы из модальных окон
    Array.prototype.forEach.call(modals, submitModal);
});
