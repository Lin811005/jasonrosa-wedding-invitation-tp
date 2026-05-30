document.addEventListener("DOMContentLoaded", function () {
    // 1. 修正：使用 querySelectorAll 抓取網頁中「所有」需要動畫的元素
    const targetElements = document.querySelectorAll(".kv-fade-in");

    // 確保網頁中有找到任何動畫元素才執行
    if (targetElements.length > 0) {
        
        // 2. 設定偵測器的觸發點
        const observerOptions = {
            root: null,        /* 以手機螢幕視窗為基準 */
            threshold: 0.5     /* 當元素有 50% 進入畫面時觸發 */
        };

        // 3. 建立偵測器
        const observer = new IntersectionObserver(function (entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // 【進入畫面 30%】加上 Class，觸發各自的 CSS 動畫
                    entry.target.classList.add("is-active");
                } else {
                    // 【離開畫面】自動移除 Class，為下一次滑入做好準備
                    entry.target.classList.remove("is-active");
                }
            });
        }, observerOptions);

        // 4. 修正：使用迴圈讓偵測器同時監控每一個 .kv-fade-in 元素
        targetElements.forEach(element => {
            observer.observe(element);
        });
    }
});
