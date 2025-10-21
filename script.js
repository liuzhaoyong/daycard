// 自动获取当前日期
const now = new Date();
const year = now.getFullYear();
const month = now.getMonth() + 1; // 月份从0开始，需要+1
const day = now.getDate();
const weekdays = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
const weekday = weekdays[now.getDay()];

document.getElementById('currentYear').textContent = year;
document.getElementById('currentMonth').textContent = month;
document.getElementById('currentDay').textContent = day;
document.getElementById('currentWeekday').textContent = weekday;

// 防抖函数
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// 配置数据存储
const config = {
    totalScore: 0,
    version: "1.0.0",
    lastUpdated: "2024-01-01"
};

const rewards = [
    {
        points: 10,
        reward: "畅享15分钟动画时光",
        description: "当日即可解锁，快乐即刻开始！"
    },
    {
        points: 25,
        reward: "Switch周末畅玩延长30分钟",
        description: "周末游戏时间从1小时升级为1.5小时！"
    },
    {
        points: 40,
        reward: "自选饮料+美味小零食",
        description: "挑选最爱的口味，甜蜜加倍！"
    },
    {
        points: 50,
        reward: "20元专属玩具大选购",
        description: "把心仪的小宝贝带回家！"
    },
    {
        points: 60,
        reward: "玩具店扭蛋惊喜大挑战",
        description: "开启神秘盒，收获未知快乐！"
    },
    {
        points: 100,
        reward: "50元左右玩具随心选",
        description: "可以选喜欢的积木、玩偶或益智玩具！"
    },
    {
        points: 150,
        reward: "周末壹方城机动游戏一次（100个币）",
        description: "能玩喜欢的摇摇车、投篮机，超尽兴！"
    },
    {
        points: 200,
        reward: "全新Switch游戏带回家",
        description: "全家共享欢乐，开启游戏新旅程！"
    }
];

const tasks = {
    dailyTasks: {
        selfCare: [
            {
                id: "dress",
                name: "👕 自己穿衣服",
                description: "✅做对加1分，❌没做减1分",
                scores: [
                    { value: 1, label: "+1", title: "做对加1分" },
                    { value: 0, label: "0", title: "没做错填0分" },
                    { value: -1, label: "-1", title: "没做减1分" }
                ]
            },
            {
                id: "brushTeethMorning",
                name: "🦷 早上自己刷牙（刷干净）",
                description: "✅做对加1分，❌没做减1分",
                scores: [
                    { value: 1, label: "+1", title: "做对加1分" },
                    { value: 0, label: "0", title: "没做错填0分" },
                    { value: -1, label: "-1", title: "没做减1分" }
                ]
            },
            {
                id: "brushTeethEvening",
                name: "🦷 晚上自己刷牙（刷干净）",
                description: "✅做对加1分，❌没做减1分",
                scores: [
                    { value: 1, label: "+1", title: "做对加1分" },
                    { value: 0, label: "0", title: "没做错填0分" },
                    { value: -1, label: "-1", title: "没做减1分" }
                ]
            },
            {
                id: "packBag",
                name: "🎒 自己收书包",
                description: "✅做对加1分，❌没做减1分",
                scores: [
                    { value: 1, label: "+1", title: "做对加1分" },
                    { value: 0, label: "0", title: "没做错填0分" },
                    { value: -1, label: "-1", title: "没做减1分" }
                ]
            },
            {
                id: "sleep",
                name: "🛏️ 按时睡觉（周一～周五10点前）",
                description: "✅做对加1分，❌晚睡减1分",
                scores: [
                    { value: 1, label: "+1", title: "做对加1分" },
                    { value: 0, label: "0", title: "没做错填0分" },
                    { value: -1, label: "-1", title: "没做减1分" }
                ]
            },
            {
                id: "wakeUp",
                name: "⏰ 按时起床（周一～周五7点15）",
                description: "✅做对加1分，❌赖床减1分",
                scores: [
                    { value: 1, label: "+1", title: "做对加1分" },
                    { value: 0, label: "0", title: "没做错填0分" },
                    { value: -1, label: "-1", title: "没做减1分" }
                ]
            }
        ],
        eating: [
            {
                id: "breakfast",
                name: "🍳 早餐按时吃完",
                description: "15分钟内吃完加2分，20分钟内加1.5分，30分钟内加1分。认真吃完不扣分，不认真扣1分。",
                scores: [
                    { value: 2, label: "+2", title: "15分钟内加2分" },
                    { value: 1.5, label: "+1.5", title: "20分钟内加1.5分" },
                    { value: 1, label: "+1", title: "30分钟内加1分" },
                    { value: 0, label: "0", title: "认真吃完不扣分" },
                    { value: -1, label: "-1", title: "不认真扣1分" }
                ]
            },
            {
                id: "lunch",
                name: "🍱 午餐按时吃完",
                description: "20分钟内吃完加2分，30分钟内加1.5分，40分钟内加1分。认真吃完不扣分，不认真扣1分。",
                scores: [
                    { value: 2, label: "+2", title: "20分钟内加2分" },
                    { value: 1.5, label: "+1.5", title: "30分钟内加1.5分" },
                    { value: 1, label: "+1", title: "40分钟内加1分" },
                    { value: 0, label: "0", title: "认真吃完不扣分" },
                    { value: -1, label: "-1", title: "不认真扣1分" }
                ]
            },
            {
                id: "dinner",
                name: "🍽️ 晚餐按时吃完",
                description: "20分钟内吃完加2分，30分钟内加1.5分，40分钟内加1分。认真吃完不扣分，不认真扣1分。",
                scores: [
                    { value: 2, label: "+2", title: "20分钟内加2分" },
                    { value: 1.5, label: "+1.5", title: "30分钟内加1.5分" },
                    { value: 1, label: "+1", title: "40分钟内加1分" },
                    { value: 0, label: "0", title: "认真吃完不扣分" },
                    { value: -1, label: "-1", title: "不认真扣1分" }
                ]
            },
            {
                id: "tryNewFood",
                name: "🍎 尝试新食物",
                description: "✅当天尝试1种新食物加2分，没尝试不扣分",
                scores: [
                    { value: 2, label: "+2", title: "尝试新食物加2分" },
                    { value: 0, label: "0", title: "没尝试不扣分" }
                ]
            }
        ],
        learning: [
            {
                id: "homework",
                name: "📚 认真写作业",
                description: "✅做对加1分",
                scores: [
                    { value: 1, label: "+1", title: "做对加1分" },
                    { value: 0, label: "0", title: "正常完成不扣分" }
                ]
            },
            {
                id: "reading",
                name: "📖 读15分钟绘本",
                description: "✅做对加1分",
                scores: [
                    { value: 1, label: "+1", title: "做对加1分" },
                    { value: 0, label: "0", title: "正常完成不扣分" }
                ]
            },
            {
                id: "characters",
                name: "🔤 分享新学生字",
                description: "✅1个字加0.5分，每日上限2分",
                type: "input",
                maxScore: 2,
                scorePerItem: 0.5
            },
            {
                id: "words",
                name: "🔠 分享新学单词",
                description: "✅1个单词加0.5分，每日上限2分",
                type: "input",
                maxScore: 2,
                scorePerItem: 0.5
            }
        ],
        helping: [
            {
                id: "housework",
                name: "� 帮地忙做的事情",
                description: "✅每项加1分，无上限",
                type: "input",
                scorePerItem: 1
            }
        ],
        behavior: [
            {
                id: "noTantrum",
                name: "😊 不摔东西不大哭",
                description: "❌发脾气减3分",
                scores: [
                    { value: 0, label: "0", title: "没发脾气不扣分" },
                    { value: -3, label: "-3", title: "发脾气减3分" }
                ]
            }
        ]
    },
    challengeTasks: [
        {
            id: "climbing",
            name: "和爸妈一起爬一座山",
            description: "选不太高的山（如公园小山、郊野短路线），坚持登顶",
            points: 15
        },
        {
            id: "skill",
            name: "熟练掌握一项小技能",
            description: "比如连续跳绳10个、拼好1个复杂积木、学会系鞋带等",
            points: 20
        },
        {
            id: "book",
            name: "读完一本完整的图画书",
            description: "能简单复述书中主要内容（比如主角做了什么）",
            points: 20
        },
        {
            id: "drawing",
            name: "独立完成一幅创意画",
            description: "自己构思主题（如\"我的家\"\"太空旅行\"），不用爸妈帮忙画",
            points: 20
        }
    ]
};

// 生字和单词数据存储
let characterData = { content: '', score: 0 };
let wordData = { content: '', score: 0 };
let houseworkData = { content: '', score: 0 };

// 本地积分存储
function getMyScore() {
    return parseFloat(localStorage.getItem('myTotalScore')) || config.totalScore || 0;
}

function setMyScore(score) {
    localStorage.setItem('myTotalScore', score.toString());
}

function addToMyScore(points) {
    const currentScore = getMyScore();
    const newScore = currentScore + points;
    setMyScore(newScore);
    return newScore;
}



// 检查今天是否已经确认过分数
function getTodayKey() {
    const today = new Date();
    return `confirmed_${today.getFullYear()}_${today.getMonth()}_${today.getDate()}`;
}

function isTodayConfirmed() {
    return localStorage.getItem(getTodayKey()) === 'true';
}

function setTodayConfirmed() {
    localStorage.setItem(getTodayKey(), 'true');
}

// 自动分数计算功能
function calculateScores() {
    try {
        // 计算日常任务总分（今天总分）
        let dailyTotal = 0;
        const selectedStatuses = document.querySelectorAll('.task-status.selected');
        selectedStatuses.forEach(status => {
            const value = parseFloat(status.dataset.score) || 0;
            dailyTotal += value;
        });

        // 添加生字、单词和帮忙做事的分数
        dailyTotal += characterData.score + wordData.score + houseworkData.score;

        // 计算挑战任务加分（从挑战任务表格复选框获取）
        let challengeTotal = 0;
        const challengeCheckboxes = document.querySelectorAll('.challenge-checkbox');
        challengeCheckboxes.forEach(checkbox => {
            if (checkbox.checked) {
                challengeTotal += parseInt(checkbox.dataset.points);
            }
        });

        // 获取本地存储的积分
        const myScore = getMyScore();

        // 今天总分只包含日常任务分数
        const todayTotal = dailyTotal;

        // 更新固定分数统计区域
        const todayTotalFixedEl = document.getElementById('todayTotalFixed');
        const challengeTotalFixedEl = document.getElementById('challengeTotalFixed');
        const myScoreFixedEl = document.getElementById('myScoreFixed');

        if (todayTotalFixedEl) todayTotalFixedEl.textContent = todayTotal.toFixed(1);
        if (challengeTotalFixedEl) challengeTotalFixedEl.textContent = challengeTotal;
        if (myScoreFixedEl) myScoreFixedEl.textContent = myScore.toFixed(1);



        // 更新确认按钮状态
        updateConfirmButton();

        // 更新奖励表格按钮状态
        generateRewardTable();

    } catch (error) {
        console.error('计算分数时出错:', error);
    }
}

// 创建防抖版本的计算函数
const debouncedCalculateScores = debounce(calculateScores, 100);

// 动态生成任务表格
function generateTaskTable() {
    const dailyTable = document.querySelector('.daily-table tbody');
    if (!dailyTable || !tasks.dailyTasks) {
        console.log('表格元素未找到或任务数据为空', { dailyTable, tasks: tasks.dailyTasks });
        return;
    }

    console.log('开始生成任务表格，任务分类:', Object.keys(tasks.dailyTasks));

    // 清空现有内容
    dailyTable.innerHTML = '';

    // 生成任务行
    Object.entries(tasks.dailyTasks).forEach(([category, categoryTasks]) => {
        console.log(`生成分类: ${category}, 任务数量: ${categoryTasks.length}`);
        const categoryName = getCategoryName(category);

        categoryTasks.forEach((task, index) => {
            const row = document.createElement('tr');
            row.className = 'task-row';

            if (index === 0) {
                // 第一行显示分类名称
                row.innerHTML = `
                    <td rowspan="${categoryTasks.length}">${categoryName}</td>
                    <td>${task.name}</td>
                    <td>${task.description}<br><span class="score-hint">${getScoreHint(task)}</span></td>
                    <td>${generateScoreButtons(task)}</td>
                `;
            } else {
                // 其他行不显示分类名称
                row.innerHTML = `
                    <td>${task.name}</td>
                    <td>${task.description}<br><span class="score-hint">${getScoreHint(task)}</span></td>
                    <td>${generateScoreButtons(task)}</td>
                `;
            }

            dailyTable.appendChild(row);
        });
    });
}

function getCategoryName(category) {
    const categoryNames = {
        selfCare: '自己的事',
        eating: '好好吃饭',
        learning: '学习的事',
        helping: '帮忙做事',
        behavior: '不发脾气'
    };
    return categoryNames[category] || category;
}

function getScoreHint(task) {
    if (task.type === 'input') {
        return '（点击填写按钮输入内容）';
    }
    return '（点击状态圈快速设置）';
}

function generateScoreButtons(task) {
    if (task.type === 'input') {
        // 生成输入按钮
        let modalFunction, buttonText, buttonId, scoreId, previewId;

        if (task.id === 'characters') {
            modalFunction = 'openCharacterModal';
            buttonText = '生字';
            buttonId = 'characterBtn';
            scoreId = 'characterScore';
            previewId = 'characterPreview';
        } else if (task.id === 'words') {
            modalFunction = 'openWordModal';
            buttonText = '单词';
            buttonId = 'wordBtn';
            scoreId = 'wordScore';
            previewId = 'wordPreview';
        } else if (task.id === 'housework') {
            modalFunction = 'openHouseworkModal';
            buttonText = '帮忙做事';
            buttonId = 'houseworkBtn';
            scoreId = 'houseworkScore';
            previewId = 'houseworkPreview';
        }

        return `
            <button class="input-btn" onclick="${modalFunction}()" id="${buttonId}">📝 填写${buttonText}</button>
            <div class="score-display" id="${scoreId}">0分</div>
            <div class="input-preview" id="${previewId}"></div>
        `;
    } else {
        // 生成状态圈按钮
        return task.scores.map(score =>
            `<span class="task-status ${getStatusClass(score.value)}" data-score="${score.value}" title="${score.title}">${score.label}</span>`
        ).join('');
    }
}

function getStatusClass(value) {
    if (value > 0) return 'done';
    if (value < 0) return 'not-done';
    return 'neutral';
}

// 动态生成挑战任务表格
function generateChallengeTable() {
    const challengeTable = document.querySelector('.challenge-table tbody');
    if (!challengeTable || !tasks.challengeTasks) {
        console.log('挑战表格元素未找到或任务数据为空', { challengeTable, tasks: tasks.challengeTasks });
        return;
    }

    // 清空现有内容
    challengeTable.innerHTML = '';

    // 生成挑战任务行
    tasks.challengeTasks.forEach(task => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${task.name}</td>
            <td>${task.description}</td>
            <td><input type="checkbox" class="challenge-checkbox" data-points="${task.points}"></td>
            <td>+${task.points}分</td>
        `;
        challengeTable.appendChild(row);
    });
}

// 动态生成奖励表格
function generateRewardTable() {
    const rewardTable = document.querySelector('.reward-table tbody');
    if (!rewardTable || !rewards.length) {
        console.log('奖励表格元素未找到或奖励数据为空', { rewardTable, rewards });
        return;
    }

    // 清空现有内容
    rewardTable.innerHTML = '';

    // 生成奖励行
    rewards.forEach((reward, index) => {
        const row = document.createElement('tr');
        const currentScore = getMyScore();
        const canRedeem = currentScore >= reward.points;

        row.innerHTML = `
            <td>${reward.points}分</td>
            <td>${reward.reward}</td>
            <td>${reward.description}</td>
            <td>
                <button class="redeem-btn ${canRedeem ? 'available' : 'unavailable'}" 
                        onclick="redeemReward(${index})" 
                        ${!canRedeem ? 'disabled' : ''}>
                    ${canRedeem ? '🎁 兑换' : '❌ 积分不足'}
                </button>
            </td>
        `;
        rewardTable.appendChild(row);
    });
}

// 积分兑换功能
function redeemReward(rewardIndex) {
    const reward = rewards[rewardIndex];
    const currentScore = getMyScore();

    if (currentScore < reward.points) {
        alert(`积分不足！需要${reward.points}分，当前只有${currentScore}分。`);
        return;
    }

    // 显示兑换确认对话框
    showRedeemConfirmDialog(reward, rewardIndex);
}

// 显示兑换确认对话框
function showRedeemConfirmDialog(reward, rewardIndex) {
    const dialogHTML = `
        <div class="redeem-dialog-overlay" id="redeemDialog">
            <div class="redeem-dialog">
                <h3>🎁 确认兑换奖励</h3>
                <div class="redeem-info">
                    <div class="reward-item">
                        <h4>${reward.reward}</h4>
                        <p class="reward-desc">${reward.description}</p>
                        <p class="reward-cost">需要积分：<strong>${reward.points}分</strong></p>
                        <p class="current-score">当前积分：<strong>${getMyScore()}分</strong></p>
                        <p class="after-redeem">兑换后剩余：<strong>${getMyScore() - reward.points}分</strong></p>
                    </div>
                </div>
                <div class="redeem-actions">
                    <button class="confirm-redeem-btn" onclick="confirmRedeem(${rewardIndex})">
                        ✅ 确认兑换
                    </button>
                    <button class="cancel-redeem-btn" onclick="closeRedeemDialog()">
                        ❌ 取消
                    </button>
                </div>
            </div>
        </div>
    `;

    document.body.insertAdjacentHTML('beforeend', dialogHTML);
}

// 确认兑换
function confirmRedeem(rewardIndex) {
    const reward = rewards[rewardIndex];
    const currentScore = getMyScore();

    // 扣除积分
    const newScore = currentScore - reward.points;
    setMyScore(newScore);

    // 记录兑换历史
    recordRedemption(reward);

    // 关闭对话框
    closeRedeemDialog();

    // 显示兑换成功消息
    showRedeemSuccessMessage(reward, newScore);

    // 更新界面
    generateRewardTable(); // 重新生成奖励表格以更新按钮状态
    calculateScores(); // 更新分数显示
}

// 记录兑换历史
function recordRedemption(reward) {
    const redemptions = JSON.parse(localStorage.getItem('redemptionHistory') || '[]');
    const redemption = {
        reward: reward.reward,
        points: reward.points,
        date: new Date().toISOString(),
        timestamp: Date.now()
    };

    redemptions.push(redemption);
    localStorage.setItem('redemptionHistory', JSON.stringify(redemptions));

    console.log('兑换记录已保存:', redemption);
}

// 显示兑换成功消息
function showRedeemSuccessMessage(reward, remainingScore) {
    const messageHTML = `
        <div class="redeem-success-overlay" id="redeemSuccess">
            <div class="redeem-success">
                <div class="success-icon">🎉</div>
                <h3>兑换成功！</h3>
                <div class="success-content">
                    <p><strong>🎁 ${reward.reward}</strong></p>
                    <p class="success-desc">${reward.description}</p>
                    <p class="remaining-score">剩余积分：<strong>${remainingScore}分</strong></p>
                    <p class="success-note">🌟 恭喜你获得了奖励！继续加油哦！</p>
                </div>
                <button class="success-close-btn" onclick="closeRedeemSuccess()">
                    😊 知道了
                </button>
            </div>
        </div>
    `;

    document.body.insertAdjacentHTML('beforeend', messageHTML);
}

// 关闭兑换对话框
function closeRedeemDialog() {
    const dialog = document.getElementById('redeemDialog');
    if (dialog) {
        dialog.remove();
    }
}

// 关闭兑换成功消息
function closeRedeemSuccess() {
    const success = document.getElementById('redeemSuccess');
    if (success) {
        success.remove();
    }
}

// 更新确认按钮状态
function updateConfirmButton() {
    const confirmBtn = document.getElementById('confirmBtnFixed');
    const selectedStatuses = document.querySelectorAll('.task-status.selected');
    let todayTotal = 0;

    selectedStatuses.forEach(status => {
        const value = parseFloat(status.dataset.score) || 0;
        todayTotal += value;
    });

    // 加上生字、单词和帮忙做事的分数
    todayTotal += characterData.score + wordData.score + houseworkData.score;

    if (todayTotal > 0) {
        confirmBtn.disabled = false;
        confirmBtn.textContent = '🌟 确认今日分数 🌟';
    } else {
        confirmBtn.disabled = true;
        confirmBtn.textContent = '请先完成任务打分';
    }
}

// 生字弹窗相关函数
function openCharacterModal() {
    document.getElementById('characterModal').classList.add('show');
    document.getElementById('characterInput').value = characterData.content;
    updateCharacterCounter();
}

function closeCharacterModal() {
    document.getElementById('characterModal').classList.remove('show');
}

function updateCharacterCounter() {
    const input = document.getElementById('characterInput');
    const counter = document.getElementById('characterCounter');
    const content = input.value.trim();

    // 按空格分割并过滤空字符串，计算实际生字数量
    const characters = content.split(/\s+/).filter(char => char.length > 0);
    const charCount = characters.length;

    // 按实际生字数量计分：每个生字0.5分，上限2分
    let score = Math.min(charCount * 0.5, 2);

    counter.textContent = `生字数：${charCount} | 得分：${score}分`;
    return score;
}

function saveCharacters() {
    const input = document.getElementById('characterInput');
    const content = input.value.trim();

    // 检查是否至少输入了一个生字
    const characters = content.split(/\s+/).filter(char => char.length > 0);
    if (characters.length === 0) {
        alert('请至少输入一个生字哦！');
        return;
    }

    characterData.content = content;
    characterData.score = updateCharacterCounter();

    // 更新界面显示
    document.getElementById('characterScore').textContent = `${characterData.score}分`;
    document.getElementById('characterPreview').textContent = characters.join(' ');
    document.getElementById('characterBtn').textContent = '✅ 已填写生字';
    document.getElementById('characterBtn').style.background = 'linear-gradient(45deg, #06d6a0, #118ab2)';

    closeCharacterModal();
    debouncedCalculateScores();
}

// 单词弹窗相关函数
function openWordModal() {
    document.getElementById('wordModal').classList.add('show');
    document.getElementById('wordInput').value = wordData.content;
    updateWordCounter();
}

function closeWordModal() {
    document.getElementById('wordModal').classList.remove('show');
}

function updateWordCounter() {
    const input = document.getElementById('wordInput');
    const counter = document.getElementById('wordCounter');
    const content = input.value.trim();

    // 按空格分割并过滤空字符串，计算实际单词数量
    const words = content.split(/\s+/).filter(word => word.length > 0);
    const wordCount = words.length;

    // 按实际单词数量计分：每个单词0.5分，上限2分
    let score = Math.min(wordCount * 0.5, 2);

    counter.textContent = `单词数：${wordCount} | 得分：${score}分`;
    return score;
}

function saveWords() {
    const input = document.getElementById('wordInput');
    const content = input.value.trim();

    // 检查是否至少输入了一个单词
    const words = content.split(/\s+/).filter(word => word.length > 0);
    if (words.length === 0) {
        alert('请至少输入一个单词哦！');
        return;
    }

    wordData.content = content;
    wordData.score = updateWordCounter();

    // 更新界面显示
    document.getElementById('wordScore').textContent = `${wordData.score}分`;
    document.getElementById('wordPreview').textContent = words.join(' ');
    document.getElementById('wordBtn').textContent = '✅ 已填写单词';
    document.getElementById('wordBtn').style.background = 'linear-gradient(45deg, #06d6a0, #118ab2)';

    closeWordModal();
    debouncedCalculateScores();
}

// 帮忙做事弹窗相关函数
function openHouseworkModal() {
    document.getElementById('houseworkModal').classList.add('show');
    document.getElementById('houseworkInput').value = houseworkData.content;
    updateHouseworkCounter();
}

function closeHouseworkModal() {
    document.getElementById('houseworkModal').classList.remove('show');
}

function updateHouseworkCounter() {
    const input = document.getElementById('houseworkInput');
    const counter = document.getElementById('houseworkCounter');
    const content = input.value.trim();

    // 按空格分割并过滤空字符串，计算实际事项数量
    const items = content.split(/\s+/).filter(item => item.length > 0);
    const itemCount = items.length;

    // 按实际事项数量计分：每项1分
    let score = itemCount * 1;

    counter.textContent = `事项数：${itemCount} | 得分：${score}分`;
    return score;
}

function saveHousework() {
    const input = document.getElementById('houseworkInput');
    const content = input.value.trim();

    // 检查是否至少输入了一项
    const items = content.split(/\s+/).filter(item => item.length > 0);
    if (items.length === 0) {
        alert('请至少输入一项帮忙做的事情哦！');
        return;
    }

    houseworkData.content = content;
    houseworkData.score = updateHouseworkCounter();

    // 生成美观的预览显示
    let previewHtml = '';
    items.forEach(item => {
        previewHtml += `<span class="housework-item">${item}</span>`;
    });

    // 更新界面显示
    document.getElementById('houseworkScore').textContent = `${houseworkData.score}分`;
    document.getElementById('houseworkPreview').innerHTML = previewHtml;
    document.getElementById('houseworkBtn').textContent = '✅ 已填写帮忙做事';
    document.getElementById('houseworkBtn').style.background = 'linear-gradient(45deg, #06d6a0, #118ab2)';

    closeHouseworkModal();
    debouncedCalculateScores();
}

// 显示奖励弹窗
function showRewardModal() {
    // 检查填写完整性
    const completenessCheck = checkTaskCompleteness();

    if (!completenessCheck.isComplete) {
        // 显示完整性提醒
        showCompletenessReminder(completenessCheck);
        return;
    }

    // 计算今天的分数
    let dailyTotal = 0;
    const selectedStatuses = document.querySelectorAll('.task-status.selected');
    selectedStatuses.forEach(status => {
        const value = parseFloat(status.dataset.score) || 0;
        dailyTotal += value;
    });

    // 添加生字和单词的分数
    dailyTotal += characterData.score + wordData.score;

    let challengeTotal = 0;
    const challengeCheckboxes = document.querySelectorAll('.challenge-checkbox');
    challengeCheckboxes.forEach(checkbox => {
        if (checkbox.checked) {
            challengeTotal += parseInt(checkbox.dataset.points);
        }
    });

    const todayTotalScore = dailyTotal + challengeTotal;
    let newMyScore = getMyScore();

    // 生成今日总结
    const todaySummary = generateTodaySummary();

    // 每次都将今天的分数加到总积分中（移除一天一次限制）
    if (todayTotalScore > 0) {
        newMyScore = addToMyScore(todayTotalScore);
        // 更新弹窗内容
        document.getElementById('modalTodayScore').textContent = `今天得分：${todayTotalScore.toFixed(1)}分`;
        document.getElementById('modalTotalScore').textContent = `我的积分：${newMyScore.toFixed(1)}分`;
    } else {
        // 今天分数为0
        document.getElementById('modalTodayScore').textContent = `今天得分：${todayTotalScore.toFixed(1)}分`;
        document.getElementById('modalTotalScore').textContent = `我的积分：${newMyScore.toFixed(1)}分`;
    }

    // 生成奖励消息
    const rewardMessage = generateRewardMessage(newMyScore);
    document.getElementById('rewardMessage').innerHTML = rewardMessage;

    // 添加今日总结到弹窗
    document.getElementById('todaySummary').innerHTML = todaySummary;

    // 显示弹窗
    document.getElementById('rewardModal').classList.add('show');

    // 重新计算分数以更新界面
    calculateScores();
}

// 检查任务填写完整性（只检查日常任务，不检查挑战任务）
function checkTaskCompleteness() {
    const result = {
        isComplete: true,
        unfilledTasks: [],
        totalTasks: 0,
        filledTasks: 0
    };

    // 只检查日常任务表格中的任务
    const allTaskRows = document.querySelectorAll('.daily-table tbody tr');
    allTaskRows.forEach(row => {
        const taskName = row.querySelector('td:nth-child(2)')?.textContent?.trim();
        if (!taskName) return;

        result.totalTasks++;

        // 检查是否有选中的状态
        const selectedStatus = row.querySelector('.task-status.selected');
        const inputBtn = row.querySelector('.input-btn');

        if (inputBtn) {
            // 生字或单词任务
            const isCharacterTask = taskName.includes('生字');
            const isWordTask = taskName.includes('单词');

            if (isCharacterTask && characterData.score === 0) {
                result.unfilledTasks.push(taskName);
                result.isComplete = false;
            } else if (isWordTask && wordData.score === 0) {
                result.unfilledTasks.push(taskName);
                result.isComplete = false;
            } else {
                result.filledTasks++;
            }
        } else if (!selectedStatus) {
            // 普通任务没有选择状态
            result.unfilledTasks.push(taskName);
            result.isComplete = false;
        } else {
            result.filledTasks++;
        }
    });

    return result;
}

// 显示完整性提醒
function showCompletenessReminder(completenessCheck) {
    const unfilledList = completenessCheck.unfilledTasks.map(task => `• ${task}`).join('\n');

    const reminderHTML = `
        <div class="completeness-reminder-overlay" id="completenessReminder">
            <div class="completeness-reminder">
                <h3>📝 任务填写提醒</h3>
                <div class="reminder-content">
                    <p><strong>还有 ${completenessCheck.unfilledTasks.length} 个任务没有填写：</strong></p>
                    <div class="unfilled-tasks">
                        ${completenessCheck.unfilledTasks.map(task => `<div class="unfilled-task">• ${task}</div>`).join('')}
                    </div>
                    <p class="reminder-note">💡 建议先完成所有任务再查看结果哦！</p>
                </div>
                <div class="reminder-actions">
                    <button class="reminder-btn continue-btn" onclick="continueWithIncomplete()">
                        继续查看结果
                    </button>
                    <button class="reminder-btn back-btn" onclick="closeCompletenessReminder()">
                        返回填写
                    </button>
                </div>
            </div>
        </div>
    `;

    document.body.insertAdjacentHTML('beforeend', reminderHTML);
}

// 关闭完整性提醒
function closeCompletenessReminder() {
    const reminder = document.getElementById('completenessReminder');
    if (reminder) {
        reminder.remove();
    }
}

// 继续查看结果（忽略未完成的任务）
function continueWithIncomplete() {
    closeCompletenessReminder();

    // 直接执行原来的showRewardModal逻辑，但跳过完整性检查
    showRewardModalDirect();
}

// 直接显示奖励弹窗（跳过完整性检查）
function showRewardModalDirect() {
    // 计算今天的分数
    let dailyTotal = 0;
    const selectedStatuses = document.querySelectorAll('.task-status.selected');
    selectedStatuses.forEach(status => {
        const value = parseFloat(status.dataset.score) || 0;
        dailyTotal += value;
    });

    // 添加生字和单词的分数
    dailyTotal += characterData.score + wordData.score;

    let challengeTotal = 0;
    const challengeCheckboxes = document.querySelectorAll('.challenge-checkbox');
    challengeCheckboxes.forEach(checkbox => {
        if (checkbox.checked) {
            challengeTotal += parseInt(checkbox.dataset.points);
        }
    });

    const todayTotalScore = dailyTotal + challengeTotal;
    let newMyScore = getMyScore();

    // 生成今日总结
    const todaySummary = generateTodaySummary();

    // 每次都将今天的分数加到总积分中（移除一天一次限制）
    if (todayTotalScore > 0) {
        newMyScore = addToMyScore(todayTotalScore);
        // 更新弹窗内容
        document.getElementById('modalTodayScore').textContent = `今天得分：${todayTotalScore.toFixed(1)}分`;
        document.getElementById('modalTotalScore').textContent = `我的积分：${newMyScore.toFixed(1)}分`;
    } else {
        // 今天分数为0
        document.getElementById('modalTodayScore').textContent = `今天得分：${todayTotalScore.toFixed(1)}分`;
        document.getElementById('modalTotalScore').textContent = `我的积分：${newMyScore.toFixed(1)}分`;
    }

    // 生成奖励消息
    const rewardMessage = generateRewardMessage(newMyScore);
    document.getElementById('rewardMessage').innerHTML = rewardMessage;

    // 添加今日总结到弹窗
    document.getElementById('todaySummary').innerHTML = todaySummary;

    // 显示弹窗
    document.getElementById('rewardModal').classList.add('show');

    // 重新计算分数以更新界面
    calculateScores();
}

// 生成今日总结
function generateTodaySummary() {
    const summary = {
        selfCare: [],
        eating: [],
        learning: [],
        helping: [],
        behavior: [],
        challenges: []
    };

    // 收集日常任务完成情况
    const allTaskRows = document.querySelectorAll('.daily-table tbody tr');
    allTaskRows.forEach(row => {
        const categoryCell = row.querySelector('td:first-child');
        const taskCell = row.querySelector('td:nth-child(2)');
        const selectedStatus = row.querySelector('.task-status.selected');
        const inputBtn = row.querySelector('.input-btn');

        if (!taskCell) return;

        const taskName = taskCell.textContent.trim();
        const category = categoryCell?.textContent.trim();

        let status = '';
        let score = 0;

        if (inputBtn) {
            // 生字或单词任务
            if (taskName.includes('生字') && characterData.score > 0) {
                status = `✅ 已填写 (+${characterData.score}分)`;
                score = characterData.score;
            } else if (taskName.includes('单词') && wordData.score > 0) {
                status = `✅ 已填写 (+${wordData.score}分)`;
                score = wordData.score;
            } else {
                status = '⭕ 未填写';
            }
        } else if (selectedStatus) {
            score = parseFloat(selectedStatus.dataset.score) || 0;
            const label = selectedStatus.textContent.trim();
            if (score > 0) {
                status = `✅ ${label} (+${score}分)`;
            } else if (score === 0) {
                status = `⚪ ${label} (${score}分)`;
            } else {
                status = `❌ ${label} (${score}分)`;
            }
        } else {
            status = '⭕ 未选择';
        }

        // 根据分类添加到对应数组
        const taskInfo = { name: taskName, status, score };

        if (category?.includes('自己的事')) {
            summary.selfCare.push(taskInfo);
        } else if (category?.includes('好好吃饭')) {
            summary.eating.push(taskInfo);
        } else if (category?.includes('学习的事')) {
            summary.learning.push(taskInfo);
        } else if (category?.includes('帮忙做事')) {
            summary.helping.push(taskInfo);
        } else if (category?.includes('不发脾气')) {
            summary.behavior.push(taskInfo);
        }
    });

    // 收集挑战任务完成情况
    const challengeCheckboxes = document.querySelectorAll('.challenge-checkbox');
    challengeCheckboxes.forEach(checkbox => {
        const row = checkbox.closest('tr');
        const taskName = row.querySelector('td:nth-child(2)')?.textContent?.trim();
        const points = parseInt(checkbox.dataset.points) || 0;

        if (taskName) {
            const status = checkbox.checked ? `🏆 已完成 (+${points}分)` : '⭕ 未完成';
            summary.challenges.push({ name: taskName, status, score: checkbox.checked ? points : 0 });
        }
    });

    // 生成HTML
    let summaryHTML = '<div class="today-summary"><h4>📊 今日完成情况</h4>';

    const categories = [
        { key: 'selfCare', title: '🧸 自己的事', items: summary.selfCare },
        { key: 'eating', title: '🍽️ 好好吃饭', items: summary.eating },
        { key: 'learning', title: '📚 学习的事', items: summary.learning },
        { key: 'helping', title: '🤝 帮忙做事', items: summary.helping },
        { key: 'behavior', title: '😊 不发脾气', items: summary.behavior },
        { key: 'challenges', title: '🏆 挑战任务', items: summary.challenges }
    ];

    categories.forEach(category => {
        if (category.items.length > 0) {
            summaryHTML += `<div class="summary-category">`;
            summaryHTML += `<h5>${category.title}</h5>`;
            summaryHTML += `<ul class="summary-list">`;

            category.items.forEach(item => {
                summaryHTML += `<li class="summary-item">${item.name}: ${item.status}</li>`;
            });

            summaryHTML += `</ul></div>`;
        }
    });

    // 计算总分
    const totalDailyScore = [...summary.selfCare, ...summary.eating, ...summary.learning, ...summary.helping, ...summary.behavior]
        .reduce((sum, item) => sum + item.score, 0);
    const totalChallengeScore = summary.challenges.reduce((sum, item) => sum + item.score, 0);
    const grandTotal = totalDailyScore + totalChallengeScore;

    summaryHTML += `
        <div class="summary-total">
            <p><strong>📈 今日得分统计：</strong></p>
            <p>• 日常任务：${totalDailyScore.toFixed(1)}分</p>
            <p>• 挑战任务：${totalChallengeScore}分</p>
            <p><strong>• 今日总分：${grandTotal.toFixed(1)}分</strong></p>
        </div>
    `;

    summaryHTML += '</div>';

    return summaryHTML;
}

// 生成奖励消息
function generateRewardMessage(totalScore) {
    let message = '';
    const availableRewards = rewards.filter(r => totalScore >= r.points);

    if (availableRewards.length > 0) {
        // 有可兑换的奖励
        const bestReward = availableRewards[availableRewards.length - 1];
        message += `<div class="reward-available">`;
        message += `<h4>🎁 恭喜！你可以兑换：</h4>`;
        message += `<strong>${bestReward.reward}</strong><br>`;
        message += `<small>${bestReward.description}</small>`;
        message += `</div>`;

        // 如果还有更高级的奖励
        const nextReward = rewards.find(r => r.points > totalScore);
        if (nextReward) {
            const needed = nextReward.points - totalScore;
            message += `<div class="reward-next">`;
            message += `<h4>🌟 继续加油！</h4>`;
            message += `再得 <strong>${needed.toFixed(1)}分</strong> 就能解锁：<br>`;
            message += `<strong>${nextReward.reward}</strong>`;
            message += `</div>`;
        }
    } else {
        // 没有可兑换的奖励
        const nextReward = rewards[0];
        const needed = nextReward.points - totalScore;
        message += `<div class="reward-next">`;
        message += `<h4>💪 加油努力！</h4>`;
        message += `再得 <strong>${needed.toFixed(1)}分</strong> 就能获得第一个奖励：<br>`;
        message += `<strong>${nextReward.reward}</strong><br>`;
        message += `<small>${nextReward.description}</small>`;
        message += `</div>`;
    }

    // 添加鼓励语
    const encouragements = [
        "你今天表现得很棒！继续保持哦！ 🌟",
        "每一分都是你努力的证明！ 💪",
        "小小的进步，大大的成长！ 🌱",
        "你是最棒的小朋友！ 🎉",
        "坚持就是胜利，加油！ 🚀"
    ];
    const randomEncouragement = encouragements[Math.floor(Math.random() * encouragements.length)];
    message += `<p style="margin-top: 20px; color: #ff6b6b; font-weight: bold;">${randomEncouragement}</p>`;

    return message;
}

// 关闭奖励弹窗并清空所有已填写状态
function closeRewardModal() {
    document.getElementById('rewardModal').classList.remove('show');

    // 清空所有已填写状态
    clearAllTaskStates();
}

// 清空所有任务状态
function clearAllTaskStates() {
    // 1. 清空日常任务的选中状态
    const selectedStatuses = document.querySelectorAll('.task-status.selected');
    selectedStatuses.forEach(status => {
        status.classList.remove('selected');
    });

    // 2. 清空挑战任务的勾选状态
    const challengeCheckboxes = document.querySelectorAll('.challenge-checkbox');
    challengeCheckboxes.forEach(checkbox => {
        checkbox.checked = false;
    });

    // 3. 清空生字数据和显示
    characterData = { content: '', score: 0 };
    const characterBtn = document.getElementById('characterBtn');
    const characterScore = document.getElementById('characterScore');
    const characterPreview = document.getElementById('characterPreview');

    if (characterBtn) {
        characterBtn.textContent = '📝 填写生字';
        characterBtn.style.background = '';
    }
    if (characterScore) {
        characterScore.textContent = '0分';
    }
    if (characterPreview) {
        characterPreview.innerHTML = '';
    }

    // 4. 清空单词数据和显示
    wordData = { content: '', score: 0 };
    const wordBtn = document.getElementById('wordBtn');
    const wordScore = document.getElementById('wordScore');
    const wordPreview = document.getElementById('wordPreview');

    if (wordBtn) {
        wordBtn.textContent = '📝 填写单词';
        wordBtn.style.background = '';
    }
    if (wordScore) {
        wordScore.textContent = '0分';
    }
    if (wordPreview) {
        wordPreview.innerHTML = '';
    }

    // 5. 手动更新界面显示（不禁用按钮，允许多次提交）
    updateScoreDisplayAfterClear();

    console.log('所有任务状态已清空，可以继续填写新任务');
}

// 清空后更新分数显示（保持按钮可用）
function updateScoreDisplayAfterClear() {
    // 更新固定分数统计区域
    const todayTotalFixedEl = document.getElementById('todayTotalFixed');
    const challengeTotalFixedEl = document.getElementById('challengeTotalFixed');
    const myScoreFixedEl = document.getElementById('myScoreFixed');

    if (todayTotalFixedEl) todayTotalFixedEl.textContent = '0.0';
    if (challengeTotalFixedEl) challengeTotalFixedEl.textContent = '0';
    if (myScoreFixedEl) myScoreFixedEl.textContent = getMyScore().toFixed(1);

    // 更新进度条
    const progressFill = document.getElementById('progressFill');
    const progressText = document.getElementById('progressText');
    if (progressFill) progressFill.style.width = '0%';
    if (progressText) progressText.textContent = '0/17 个任务';

    // 保持确认按钮可用，允许多次提交
    const confirmBtn = document.getElementById('confirmBtnFixed');
    if (confirmBtn) {
        confirmBtn.disabled = false;
        confirmBtn.textContent = '🌟 确认今日分数 🌟';
    }

    console.log('界面已更新，按钮保持可用状态');
}



// 日常任务状态指示器功能
function setupTaskStatusIndicators() {
    const statusIndicators = document.querySelectorAll('.task-status');
    statusIndicators.forEach(status => {
        // 添加触摸事件支持
        status.addEventListener('touchstart', function (e) {
            e.preventDefault(); // 防止双击缩放
            this.style.transform = 'scale(0.95)';
        });

        status.addEventListener('touchend', function (e) {
            e.preventDefault();
            this.style.transform = '';
            handleStatusClick.call(this);
        });

        status.addEventListener('click', function (e) {
            e.preventDefault();
            handleStatusClick.call(this);
        });

        function handleStatusClick() {
            // 移除同一行其他状态的选中状态
            this.parentElement.querySelectorAll('.task-status').forEach(s => {
                s.classList.remove('selected');
            });

            // 添加当前状态的选中状态
            this.classList.add('selected');

            // 播放音效
            try {
                playSuccessSound();
            } catch (e) {
                console.log('Audio not available');
            }

            // 更新进度条
            if (window.updateProgress) {
                updateProgress();
            }

            // 添加视觉反馈
            this.style.transform = 'scale(1.1)';
            setTimeout(() => {
                this.style.transform = '';
            }, 200);

            debouncedCalculateScores();
        }
    });
}

// 为所有输入框添加事件监听
document.addEventListener('DOMContentLoaded', function () {
    console.log('DOM加载完成，开始初始化...');

    // 生成动态表格
    console.log('开始生成表格...', { tasks, rewards });
    generateTaskTable();
    generateChallengeTable();
    generateRewardTable();
    console.log('表格生成完成');

    // 表格生成后，重新绑定所有事件监听器
    // 挑战任务复选框（需要重新绑定事件，因为是动态生成的）
    const challengeCheckboxes = document.querySelectorAll('.challenge-checkbox');
    challengeCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', debouncedCalculateScores);
    });

    // 设置任务状态指示器（必须在表格生成后调用）
    setupTaskStatusIndicators();





    // 生字和单词输入框事件监听
    document.getElementById('characterInput').addEventListener('input', updateCharacterCounter);
    document.getElementById('wordInput').addEventListener('input', updateWordCounter);

    // 点击弹窗外部关闭
    document.getElementById('rewardModal').addEventListener('click', function (e) {
        if (e.target === this) {
            closeRewardModal();
        }
    });

    document.getElementById('characterModal').addEventListener('click', function (e) {
        if (e.target === this) {
            closeCharacterModal();
        }
    });

    document.getElementById('wordModal').addEventListener('click', function (e) {
        if (e.target === this) {
            closeWordModal();
        }
    });

    // ESC键关闭弹窗
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') {
            closeRewardModal();
            closeCharacterModal();
            closeWordModal();
        }
    });

    // 初始化计算
    calculateScores();


    // 切换帮助卡片
    window.toggleHelpCard = function () {
        const helpCard = document.getElementById('helpCard');
        helpCard.classList.toggle('show');
    }

    // 更新进度条
    window.updateProgress = function () {
        const totalTasks = 17; // 总任务数
        const completedTasks = document.querySelectorAll('.task-status.selected').length;
        const progressPercent = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

        document.getElementById('progressFill').style.width = progressPercent + '%';
        document.getElementById('progressText').textContent = `${completedTasks}/${totalTasks} 个任务`;
    }

    // 播放成功音效（如果浏览器支持）
    window.playSuccessSound = function () {
        try {
            // 创建音频上下文
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();

            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);

            oscillator.frequency.setValueAtTime(523.25, audioContext.currentTime); // C5
            oscillator.frequency.setValueAtTime(659.25, audioContext.currentTime + 0.1); // E5
            oscillator.frequency.setValueAtTime(783.99, audioContext.currentTime + 0.2); // G5

            gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);

            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + 0.3);
        } catch (e) {
            // 如果音频不支持，静默失败
            console.log('Audio not supported');
        }
    }

    // 初始化进度条
    updateProgress();
});

// 全局函数定义
window.toggleHelpCard = function () {
    const helpCard = document.getElementById('helpCard');
    helpCard.classList.toggle('show');
}

window.showRewardModal = showRewardModal;
window.closeRewardModal = closeRewardModal;
window.openCharacterModal = openCharacterModal;
window.closeCharacterModal = closeCharacterModal;
window.saveCharacters = saveCharacters;
window.openWordModal = openWordModal;
window.closeWordModal = closeWordModal;
window.saveWords = saveWords;