// データを読み込む
let serverData = {};

// JSONデータを読み込む
async function loadData() {
    try {
        const response = await fetch('data.json');
        serverData = await response.json();
        renderPage();
    } catch (error) {
        console.error('データの読み込みに失敗しました:', error);
        // フォールバックデータ
        serverData = getFallbackData();
        renderPage();
    }
}

// フォールバックデータ
function getFallbackData() {
    return {
        server: {
            name: "かぬれ王国",
            description: "かぬれさんと仲良くなった上に他の人とも仲を深めたら入れるサーバー かぬれさんがメンヘラなだけあってメンヘラだらけ",
            memberSince: "2024年9月27日",
            inviteLink: "https://discord.gg/kanure"
        },
        profile: {
            displayName: "かぬれ",
            username: "god_kanure",
            badge: "依存症",
            aboutMe: "かぬれだよ、あは。",
            roles: [
                { name: "オーナー", color: "owner" },
                { name: "admin", color: "admin" },
                { name: "鯖民", color: "member" }
            ]
        },
        members: [
            { name: "かぬれ", role: "オーナー", avatar: "https://via.placeholder.com/150" },
            { name: "愛来", role: "メンバー", avatar: "https://via.placeholder.com/150" }
        ],
        rules: [
            {
                number: 1,
                title: "利用規約への同意",
                description: "Discord利用規約および本サーバーの利用規約に同意してください。役割付与時点で同意したものとみなします。"
            },
            {
                number: 2,
                title: "寛容な心を持って",
                description: "精神的に不安定な方もいる可能性があるため、暴言やネガティブな発言には寛容な心を持って接してください。"
            },
            {
                number: 3,
                title: "年齢・学歴は関係なし",
                description: "年齢や学歴に関係なく、レスバ以外で喧嘩せず普通に接してください。レスバ以外で喧嘩が続く場合はタイムアウトします。"
            },
            {
                number: 4,
                title: "リア充への対応",
                description: "リア充が嫌いな方は、リア充に絡まず離れるか気にせず接してください。"
            },
            {
                number: 5,
                title: "部屋作成のリクエスト",
                description: "新しい部屋を作りたい場合は、リクエスト部屋でお願いします。"
            },
            {
                number: 6,
                title: "犯罪行為・迷惑行為の禁止",
                description: "犯罪行為や迷惑行為が発覚した場合、サーバーから追放します。場合によっては警察に通報することもあります。"
            },
            {
                number: 7,
                title: "基本的に自由",
                description: "他人に迷惑をかける行為を行わない限り、基本的に自由に行動していただいて構いません。"
            },
            {
                number: 8,
                title: "違反の報告",
                description: "規約違反を発見した場合は、鯖缶の誰かに報告してください。"
            }
        ],
        stats: {
            members: 64,
            online: 19,
            channels: 12
        },
        serverInfo: {
            createdAt: "2025年11月",
            inviteUrl: "https://discord.gg/kanure",
            inviteExpiry: "無期限",
            inviteUses: "無制限"
        },
        prerequisiteServers: [
            {
                name: "前提サーバー1",
                inviteUrl: "https://discord.gg/bRZc8mU8BX",
                owner: "lwa70d3"
            },
            {
                name: "前提サーバー2",
                inviteUrl: "https://discord.gg/Rjekxj6Cea",
                owner: "lwa70d3"
            }
        ],
        admins: [
            { 
                name: "かぬれ", 
                role: "オーナー", 
                username: "god_kanure", 
                avatar: "画像/かぬれ ico.jpg", 
                status: "", 
                aboutMe: "かぬれだよ、あは。", 
                badge: "依存症",
                introduction: "かぬれ王国のサーバー主、かぬれです。みんなで楽しく過ごせる場所を作りたいと思っています。かぬれだよ、あは。",
                socialLinks: { x: "https://x.com/kanu18_" }
            },
            {
                name: "KamikazeMitDieKatze(=^-^=)ノ",
                role: "副官",
                username: "kamikaze314",
                avatar: "画像/神風 ico.png",
                status: "神風唯織、御影蛍、神代あおい。",
                aboutMe: "神風唯織、御影蛍、神代あおい。",
                badge: ""
            },
            {
                name: "reika (サバ缶)",
                role: "副官",
                username: "lwa70d3",
                avatar: "画像/reika ico.jpg",
                status: "fall into the night",
                aboutMe: "年齢にそぐわぬ声をしている。私の勘と行動力は最強!!! Q.E.D. 証明完了!!!!",
                badge: "依存症",
                socialLinks: {
                    x: "https://x.com/LwA70D3",
                    youtube: "https://www.youtube.com/@LwA70D3",
                    website1: "https://laevateinn.vercel.app",
                    website2: "https://reika-one.vercel.app"
                }
            }
        ]
    };
}

// ページをレンダリング
function renderPage() {
    renderServerInfo();
    renderStaff();
    renderRules();
    setupNavigation();
}

// サーバー情報をレンダリング（ヒーローセクション）
function renderServerInfo() {
    const server = serverData.server;
    const serverInfo = serverData.serverInfo;
    
    if (server) {
        document.getElementById('server-name').textContent = server.name;
        document.getElementById('server-subtitle').textContent = 'Kanure Kingdom';
    }
    
    // サーバーについてセクションの情報
    if (serverInfo && serverInfo.createdAt) {
        document.getElementById('created-date').textContent = serverInfo.createdAt;
    }
    if (server) {
        document.getElementById('server-description-text').textContent = server.description || 'かぬれさんと仲良くなった上に他の人とも仲を深めたら入れるサーバー かぬれさんがメンヘラなだけあってメンヘラだらけ';
    }
    
    // 前提サーバーをレンダリング
    renderPrerequisiteServers();
}

// 前提サーバーをレンダリング
function renderPrerequisiteServers() {
    const prerequisiteServers = serverData.prerequisiteServers || [];
    const container = document.getElementById('prerequisite-servers');
    
    if (prerequisiteServers.length === 0) {
        container.innerHTML = '<p>前提サーバーはありません</p>';
        return;
    }
    
    container.innerHTML = '';
    prerequisiteServers.forEach((server, index) => {
        const serverItem = document.createElement('div');
        serverItem.className = 'prerequisite-server-item';
        serverItem.innerHTML = `
            <div class="prerequisite-server-info">
                <span class="prerequisite-server-name">${server.name}</span>
                <span class="prerequisite-server-owner">鯖主: ${server.owner}</span>
            </div>
            <a href="${server.inviteUrl}" target="_blank" rel="noopener noreferrer" class="prerequisite-server-link">
                <span>参加する</span>
            </a>
        `;
        container.appendChild(serverItem);
    });
}

// 責任者・管理者・副官をレンダリング
function renderStaff() {
    const staffGrid = document.getElementById('staff-grid');
    const admins = serverData.admins || [];
    
    // 責任者、管理者、副官の順に並べ替え
    const sortedAdmins = [...admins].sort((a, b) => {
        const order = { 'オーナー': 1, 'admin': 2, '副官': 3 };
        return (order[a.role] || 99) - (order[b.role] || 99);
    });
    
    staffGrid.innerHTML = '';
    sortedAdmins.forEach(admin => {
        const staffCard = document.createElement('div');
        staffCard.className = 'staff-card';
        
        // SNSリンクの生成
        let socialLinksHTML = '';
        if (admin.socialLinks) {
            socialLinksHTML = '<div class="staff-social-links">';
            if (admin.socialLinks.x) {
                socialLinksHTML += `<a href="${admin.socialLinks.x}" target="_blank" rel="noopener noreferrer" class="social-link social-x" title="X (Twitter)">X</a>`;
            }
            if (admin.socialLinks.youtube) {
                socialLinksHTML += `<a href="${admin.socialLinks.youtube}" target="_blank" rel="noopener noreferrer" class="social-link social-youtube" title="YouTube">YouTube</a>`;
            }
            if (admin.socialLinks.website1) {
                socialLinksHTML += `<a href="${admin.socialLinks.website1}" target="_blank" rel="noopener noreferrer" class="social-link social-website" title="Laevateinn">Laevateinn</a>`;
            }
            if (admin.socialLinks.website2) {
                socialLinksHTML += `<a href="${admin.socialLinks.website2}" target="_blank" rel="noopener noreferrer" class="social-link social-website" title="reika-one">reika-one</a>`;
            }
            socialLinksHTML += '</div>';
        }
        
        // ロールバッジの色を決定
        let roleClass = 'role-admin';
        if (admin.role === 'オーナー') {
            roleClass = 'role-owner';
        } else if (admin.role === '副官') {
            roleClass = 'role-deputy';
        }
        
        staffCard.innerHTML = `
            <div class="staff-avatar-container">
                <img src="${admin.avatar}" alt="${admin.name}" class="staff-avatar">
                <div class="staff-status online"></div>
            </div>
            <div class="staff-info">
                <div class="staff-name">${admin.name}</div>
                <div class="staff-username">@${admin.username || ''}</div>
                ${admin.badge ? `<div class="staff-badge">${admin.badge}</div>` : ''}
                <div class="staff-role-badge ${roleClass}">${admin.role}</div>
                ${admin.status ? `<div class="staff-status-message">${admin.status}</div>` : ''}
                ${admin.aboutMe ? `<div class="staff-about">${admin.aboutMe}</div>` : ''}
                ${socialLinksHTML}
            </div>
        `;
        staffGrid.appendChild(staffCard);
    });
}

// ルールをレンダリング
function renderRules() {
    const rulesList = document.getElementById('rules-list');
    const rules = serverData.rules || [];
    
    rulesList.innerHTML = '';
    rules.forEach(rule => {
        const ruleItem = document.createElement('div');
        ruleItem.className = 'rule-item';
        ruleItem.innerHTML = `
            <div class="rule-number">${rule.number}</div>
            <div class="rule-content">
                <div class="rule-title">${rule.title}</div>
                <div class="rule-description">${rule.description}</div>
            </div>
        `;
        rulesList.appendChild(ruleItem);
    });
}

// ナビゲーションの設定
function setupNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.section, .hero');
    
    // スムーススクロール
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                
                // アクティブ状態を更新
                navLinks.forEach(l => l.classList.remove('active'));
                link.classList.add('active');
            }
        });
    });
    
    // スクロール時のアクティブ状態更新
    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.pageYOffset >= sectionTop - 100) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').substring(1) === current) {
                link.classList.add('active');
            }
        });
    });
}

// スクロールアニメーション
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, index * 100);
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // アニメーション対象の要素を監視
    document.querySelectorAll('.staff-card, .rule-item, .info-box').forEach((el, index) => {
        el.classList.add('fade-in');
        observer.observe(el);
    });

    // スタッフカードに順次アニメーション
    document.querySelectorAll('.staff-card').forEach((card, index) => {
        card.style.animationDelay = `${index * 0.2}s`;
    });

    // ルールアイテムに順次アニメーション
    document.querySelectorAll('.rule-item').forEach((item, index) => {
        item.style.animationDelay = `${index * 0.1}s`;
    });
}

// ページ読み込み時にデータを読み込む
document.addEventListener('DOMContentLoaded', () => {
    loadData();
    
    // スクロールアニメーションを初期化
    setTimeout(() => {
        initScrollAnimations();
    }, 500);
});

