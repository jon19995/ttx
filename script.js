window.addEventListener("DOMContentLoaded", () => {
    //Переменные:
    let title_of_email = "";

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

    // слушатели для закрытия модалки:
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

    // открытие модалки записи на прием/диагностику...:
    function openModal(btn) {
        btn.addEventListener("click", ({ target }) => {
            const modal = document.querySelector("#modal-entry");
            
            if (modal) {
                modal.style.display = "flex";
                title_of_email = target.getAttribute("data-modal-title");
            }
        });
    }

    // Submit модалки:
    function submitModal(modal) {
        const form = modal.querySelector("form")
        
        form.addEventListener("submit", (e) => {
            e.preventDefault();
            
            const data = `${ $(form).serialize() }&title=${title_of_email}`;
            modal.style.display = "none";
            loading.open();
            
            $.ajax({
                type: "post",
                url: "mailer/smart.php",
                data,
            }).done(function (e) {
                loading.close();
                done.open();
                
                $(form).find("input").val("");
                $(form).trigger("reset");
                
                setTimeout(() => {
                    done.close();
                }, 2000)

                title_of_email = ""
            }).fail(function (jqXHR, textStatus) {
                loading.close();
            });
            return false;
        });
    }

    const loading = {
        open: () => loadingModal.style.display = "flex",
        close: () =>  loadingModal.style.display = "none",
    }

    const done = {
        open: () => doneModal.style.display = "flex",
        close: () =>  doneModal.style.display = "none",
    }

    // Работа с модальными окнами

    const modals = document.querySelectorAll("#modal-entry");
    const btnsToOpenDiagnosticEntryModal = document.querySelectorAll("button[data-modal-title]");
    const loadingModal = document.querySelector("#loading");
    const doneModal = document.querySelector("#done");

    //При нажатии кнопки находится нужная модалка и открывается
    Array.prototype.forEach.call(btnsToOpenDiagnosticEntryModal, openModal);

    //события закрытия модальных окон
    Array.prototype.forEach.call(modals, closeModal);

    //события отправки формы из модальных окон
    Array.prototype.forEach.call(modals, submitModal);
});
