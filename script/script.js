document.addEventListener("DOMContentLoaded", function () {
    // 1. 抓取網頁中所有需要動畫的元素
    const targetElements = document.querySelectorAll(".kv-fade-in");

    if (targetElements.length > 0) {
        
        // 2. 精準控制：將觸發點設定在 55%
        const observerOptions = {
            root: null,        /* 以手機螢幕視窗為基準 */
            threshold: 0.55    /* 💡 關鍵：當元素有 55% 進入畫面時才正式觸發 */
        };

        // 3. 建立偵測器
        const observer = new IntersectionObserver(function (entries, observer) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // 【滑入觸發】加上 Class，執行進場動畫
                    entry.target.classList.add("is-active");
                    
                    // 💡 僅播一次的靈魂：觸發後立刻「解除監控」，讓動畫永久定格！
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        // 4. 同時監控網頁中的每一個動畫元素
        targetElements.forEach(element => {
            observer.observe(element);
        });
    }
});

