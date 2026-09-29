// 这个行业的分类体系：类别、标签词表、公司（主体）名录，以及防止张冠李戴的身份词典。
// 模型按这里的词表打标签，主题页（topics.json）按标签归类，筛选栏按类别分组。
// 换行业时：类别的 key 会出现在网址里（/all?category=…），上线后就不要再改；标签和名录可以随时增减。

/**
 * 网页上的类别（筛选栏、卡片角标、RSS 分类订阅）。key 是网址和接口里的身份，上线后不要改。
 * section 是日报里的分节标题（几个类别可以共用一节，按这里的顺序排）；guide 告诉模型怎么归类。
 * 没归上类的资料在日报里放进第一个 key 为 industry 的类别所在的节（没有就放最后一节）。
 */
export const CATEGORIES = [
  { key: "approval", label: "获批注册", section: "注册与获批", guide: "产品通过监管审批或拿到注册的里程碑：NMPA 注册证与创新/优先审批、FDA 510(k)/De Novo/PMA、CE MDR/IVDR 认证，以及审评受理、临床试验审批、发补与获批结果" },
  { key: "product", label: "产品与技术", section: "产品与技术", guide: "器械新品、产品迭代、平台与零部件、材料工艺、软件与算法的发布与更新" },
  { key: "policy", label: "政策监管", section: "政策与监管", guide: "法规、指导原则、行业标准、分类界定、医保支付、集采与招采、监管处罚与合规要求" },
  { key: "clinical", label: "临床与证据", section: "临床与证据", guide: "临床试验设计与结果、真实世界数据、循证评价、适应证扩展与上市后研究" },
  { key: "safety", label: "召回与安全", section: "召回与安全", guide: "产品召回、不良事件、质量缺陷、飞行检查、安全警示与诉讼" },
  { key: "industry", label: "行业商业", section: "行业动态", guide: "融资并购、IPO、财报、人事、合作、渠道、产能与市场格局" },
  { key: "opinion", label: "观点与解读", section: "观点与解读", guide: "行业分析、人物观点、趋势判断、访谈与复盘" },
] as const;

/**
 * 内容理解一步给每篇资料判的“内容类型”（写在 prompts/content-understanding.md 里，改了类型要同步改那份提示词）。
 * 评分提示词（prompts/selection-score.md）按类型给五个维度不同的权重。
 */
export const ITEM_TYPES = [
  "device_approval", "product_launch", "tech_breakthrough", "clinical_evidence", "regulatory_policy", "safety_recall", "industry_business", "opinion_analysis",
] as const;

// ── 标签词表 ────────────────────────────────────────────────────────────────────────────

/** 每篇资料的第一个标签必须是这些“分类标签”之一。 */
export const CATEGORY_TAGS = [
  "产品获批", "产品发布", "技术/研发", "临床/证据", "政策/法规", "集采/招采", "召回/安全", "融资/商业", "标准/专利", "行业动态", "观点/趋势",
  "非器械/通用内容", "其他",
] as const;

/** 可选的主题标签。 */
export const TOPIC_TAGS = [
  "手术机器人", "医学影像", "体外诊断", "冠脉介入", "结构心脏病", "电生理", "外周介入", "心律管理", "神经介入", "脑机接口", "骨科", "眼科", "口腔", "内窥镜", "低值耗材",
  "康复器械", "家用医疗设备", "可穿戴医疗", "生物材料", "增材制造", "有源器械", "无源器械", "血液净化", "消毒灭菌",
] as const;

/** 可选的实体标签（公司、机构、平台）。 */
export const ENTITY_TAGS = [
  "迈瑞医疗", "联影医疗", "微创医疗", "威高股份", "乐普医疗", "鱼跃医疗", "天智航", "直觉外科", "美敦力", "强生医疗", "雅培", "波士顿科学",
  "西门子医疗", "GE医疗", "飞利浦", "史赛克", "罗氏诊断", "Illumina",
] as const;

/** 模型常写的近义词，统一成词表里的写法。 */
export const TAG_SYNONYMS: Readonly<Record<string, string>> = {
  器械获批: "产品获批", 注册获批: "产品获批", 获批: "产品获批", 注册: "产品获批", 审批: "产品获批", 认证: "产品获批",
  新品: "产品发布", 上市: "产品发布", 发布: "产品发布", 上市批准: "产品发布",
  技术: "技术/研发", 研发: "技术/研发", 创新: "技术/研发", 研发进展: "技术/研发",
  临床: "临床/证据", 临床试验: "临床/证据", 循证: "临床/证据", 证据: "临床/证据", 研究: "临床/证据",
  政策: "政策/法规", 法规: "政策/法规", 监管: "政策/法规", 合规: "政策/法规", 指导原则: "政策/法规",
  集采: "集采/招采", 招采: "集采/招采", 招标: "集采/招采", 医保: "集采/招采", 采购: "集采/招采",
  召回: "召回/安全", 不良事件: "召回/安全", 安全: "召回/安全", 质量: "召回/安全", 质量缺陷: "召回/安全", 飞检: "召回/安全",
  融资: "融资/商业", 收购: "融资/商业", 并购: "融资/商业", 投资: "融资/商业", IPO: "融资/商业", 财报: "融资/商业", 商业: "融资/商业", 公司动态: "融资/商业",
  标准: "标准/专利", 专利: "标准/专利",
  行业: "行业动态", 动态: "行业动态", 市场: "行业动态",
  观点: "观点/趋势", 分析: "观点/趋势", 趋势: "观点/趋势", 评论: "观点/趋势",
  影像: "医学影像", 影像设备: "医学影像", 医学影像设备: "医学影像",
  IVD: "体外诊断", ivd: "体外诊断", 体外诊断试剂: "体外诊断", 诊断试剂: "体外诊断",
  机器人: "手术机器人", 内镜: "内窥镜", "3D打印": "增材制造", 增材: "增材制造",
  冠脉: "冠脉介入", 冠脉支架: "冠脉介入", 支架: "冠脉介入",
  瓣膜: "结构心脏病", TAVR: "结构心脏病", TAVI: "结构心脏病", 封堵器: "结构心脏病",
  消融: "电生理", 射频消融: "电生理",
  外周血管: "外周介入", 主动脉: "外周介入",
  起搏器: "心律管理", ICD: "心律管理", CRT: "心律管理",
  神经血管: "神经介入", 脑血管: "神经介入",
  BCI: "脑机接口",
  非器械: "非器械/通用内容", 通用内容: "非器械/通用内容",
};

/** 模型漏了分类标签时，按内容类型补一个。 */
export const CATEGORY_BY_ITEM_TYPE: Readonly<Record<string, string>> = {
  device_approval: "产品获批", product_launch: "产品发布", tech_breakthrough: "技术/研发", clinical_evidence: "临床/证据",
  regulatory_policy: "政策/法规", safety_recall: "召回/安全", industry_business: "行业动态", opinion_analysis: "观点/趋势",
};

// ── 公司与主体 ──────────────────────────────────────────────────────────────────────────

/** 公司主题：id → 显示名、卡片上显示的标签（null 表示只用 entity:<id> 归类）、别名。 */
export const ENTITIES: Record<string, { name: string; displayTag: string | null; aliases: string[] }> = {
  mindray: { name: "迈瑞医疗", displayTag: "迈瑞医疗", aliases: ["迈瑞医疗", "迈瑞", "Mindray"] },
  "united-imaging": { name: "联影医疗", displayTag: "联影医疗", aliases: ["联影医疗", "联影", "United Imaging", "UIH"] },
  microport: { name: "微创医疗", displayTag: "微创医疗", aliases: ["微创医疗", "微创", "MicroPort"] },
  weigao: { name: "威高股份", displayTag: "威高股份", aliases: ["威高", "Weigao"] },
  lepu: { name: "乐普医疗", displayTag: "乐普医疗", aliases: ["乐普医疗", "乐普", "Lepu"] },
  yuyue: { name: "鱼跃医疗", displayTag: "鱼跃医疗", aliases: ["鱼跃医疗", "鱼跃", "Yuwell"] },
  tianzhihang: { name: "天智航", displayTag: "天智航", aliases: ["天智航", "Tinavi"] },
  intuitive: { name: "直觉外科", displayTag: "直觉外科", aliases: ["直觉外科", "Intuitive", "Intuitive Surgical", "达芬奇", "da Vinci"] },
  medtronic: { name: "美敦力", displayTag: "美敦力", aliases: ["美敦力", "Medtronic"] },
  jnj: { name: "强生医疗", displayTag: "强生医疗", aliases: ["强生医疗", "强生", "J&J MedTech", "Johnson & Johnson", "Ethicon", "DePuy"] },
  abbott: { name: "雅培", displayTag: "雅培", aliases: ["雅培", "Abbott"] },
  "boston-scientific": { name: "波士顿科学", displayTag: "波士顿科学", aliases: ["波士顿科学", "Boston Scientific"] },
  "siemens-healthineers": { name: "西门子医疗", displayTag: "西门子医疗", aliases: ["西门子医疗", "Siemens Healthineers"] },
  "ge-healthcare": { name: "GE医疗", displayTag: "GE医疗", aliases: ["GE医疗", "GE HealthCare", "通用电气医疗"] },
  philips: { name: "飞利浦", displayTag: "飞利浦", aliases: ["飞利浦", "Philips"] },
  stryker: { name: "史赛克", displayTag: "史赛克", aliases: ["史赛克", "Stryker"] },
  "zimmer-biomet": { name: "捷迈邦美", displayTag: null, aliases: ["捷迈邦美", "Zimmer Biomet"] },
  edwards: { name: "爱德华生命科学", displayTag: null, aliases: ["爱德华生命科学", "爱德华", "Edwards Lifesciences"] },
  "roche-diagnostics": { name: "罗氏诊断", displayTag: "罗氏诊断", aliases: ["罗氏诊断", "罗氏", "Roche Diagnostics", "Roche"] },
  danaher: { name: "丹纳赫", displayTag: null, aliases: ["丹纳赫", "Danaher", "贝克曼", "Beckman Coulter"] },
  illumina: { name: "Illumina", displayTag: "Illumina", aliases: ["Illumina"] },
  olympus: { name: "奥林巴斯", displayTag: null, aliases: ["奥林巴斯", "Olympus"] },
  fujifilm: { name: "富士胶片", displayTag: null, aliases: ["富士胶片", "富士", "Fujifilm"] },
  agilent: { name: "安捷伦", displayTag: null, aliases: ["安捷伦", "Agilent"] },
  baxter: { name: "百特", displayTag: null, aliases: ["百特", "Baxter"] },
  "becton-dickinson": { name: "碧迪医疗", displayTag: null, aliases: ["碧迪医疗", "碧迪", "Becton Dickinson"] },
  "neusoft-medical": { name: "东软医疗", displayTag: null, aliases: ["东软医疗", "东软", "Neusoft Medical"] },
  sonoscape: { name: "开立医疗", displayTag: null, aliases: ["开立医疗", "开立", "SonoScape"] },
  wandong: { name: "万东医疗", displayTag: null, aliases: ["万东医疗", "万东"] },
  "edge-medical": { name: "精锋医疗", displayTag: null, aliases: ["精锋医疗", "精锋", "Edge Medical"] },
};

/**
 * 身份词典：摘要和标题里出现的公司，必须在原文里也出现过，否则退回原标题、丢掉摘要（防止模型张冠李戴）。
 * 医疗器械里型号、注册证、厂商极易被写错，这里要尽量覆盖主要厂商。
 */
export const IDENTITY_LEXICON: ReadonlyArray<{ id: string; name: string; patterns: RegExp[] }> = [
  { id: "mindray", name: "迈瑞医疗", patterns: [/迈瑞医疗|迈瑞|\bmindray\b/i] },
  { id: "united-imaging", name: "联影医疗", patterns: [/联影医疗|联影|\bunited\s?imaging\b|\buih\b/i] },
  { id: "microport", name: "微创医疗", patterns: [/微创医疗|微创|\bmicroport\b/i] },
  { id: "weigao", name: "威高股份", patterns: [/威高|\bweigao\b/i] },
  { id: "lepu", name: "乐普医疗", patterns: [/乐普医疗|乐普|\blepu\b/i] },
  { id: "yuyue", name: "鱼跃医疗", patterns: [/鱼跃医疗|鱼跃|\byuwell\b/i] },
  { id: "tianzhihang", name: "天智航", patterns: [/天智航|\btinavi\b/i] },
  { id: "intuitive", name: "直觉外科", patterns: [/直觉外科|\bintuitive\b|达芬奇|\bda\s?vinci\b/i] },
  { id: "medtronic", name: "美敦力", patterns: [/美敦力|\bmedtronic\b/i] },
  { id: "jnj", name: "强生医疗", patterns: [/强生|\bjohnson\s*&\s*johnson\b|\bj&j\s*medtech\b|\bethicon\b|\bdepuy\b/i] },
  { id: "abbott", name: "雅培", patterns: [/雅培|\babbott\b/i] },
  { id: "boston-scientific", name: "波士顿科学", patterns: [/波士顿科学|\bboston\s*scientific\b/i] },
  { id: "siemens-healthineers", name: "西门子医疗", patterns: [/西门子医疗|西门子|\bsiemens\s*healthineers\b/i] },
  { id: "ge-healthcare", name: "GE医疗", patterns: [/\bge\s*healthcare\b|\bge\s*医疗/i] },
  { id: "philips", name: "飞利浦", patterns: [/飞利浦|\bphilips\b/i] },
  { id: "stryker", name: "史赛克", patterns: [/史赛克|\bstryker\b/i] },
  { id: "zimmer-biomet", name: "捷迈邦美", patterns: [/捷迈邦美|\bzimmer\s*biomet\b/i] },
  { id: "edwards", name: "爱德华生命科学", patterns: [/爱德华生命科学|爱德华|\bedwards\s*lifesciences\b/i] },
  { id: "roche-diagnostics", name: "罗氏诊断", patterns: [/罗氏|\broche\b/i] },
  { id: "danaher", name: "丹纳赫", patterns: [/丹纳赫|\bdanaher\b|贝克曼|\bbeckman\b/i] },
  { id: "illumina", name: "Illumina", patterns: [/\billumina\b/i] },
  { id: "olympus", name: "奥林巴斯", patterns: [/奥林巴斯|\bolympus\b/i] },
  { id: "fujifilm", name: "富士胶片", patterns: [/富士胶片|富士|\bfujifilm\b/i] },
  { id: "agilent", name: "安捷伦", patterns: [/安捷伦|\bagilent\b/i] },
  { id: "baxter", name: "百特", patterns: [/百特|\bbaxter\b/i] },
  { id: "becton-dickinson", name: "碧迪医疗", patterns: [/碧迪医疗|碧迪|\bbecton\s*dickinson\b/i] },
  { id: "neusoft-medical", name: "东软医疗", patterns: [/东软医疗|东软|\bneusoft\b/i] },
  { id: "sonoscape", name: "开立医疗", patterns: [/开立医疗|开立|\bsonoscape\b/i] },
  { id: "wandong", name: "万东医疗", patterns: [/万东医疗|万东/i] },
  { id: "edge-medical", name: "精锋医疗", patterns: [/精锋医疗|精锋|\bedge\s*medical\b/i] },
];

/** 这些域名上的文章，发布方就是对应的公司（托管平台如 GitHub、arXiv 不算）。 */
export const PUBLISHER_DOMAINS: ReadonlyArray<{ entityId: string; domains: readonly string[] }> = [
  { entityId: "mindray", domains: ["mindray.com"] },
  { entityId: "united-imaging", domains: ["united-imaging.com"] },
  { entityId: "microport", domains: ["microport.com"] },
  { entityId: "weigao", domains: ["weigaogroup.com"] },
  { entityId: "lepu", domains: ["lepumedical.com"] },
  { entityId: "yuyue", domains: ["yuwell.com"] },
  { entityId: "intuitive", domains: ["intuitive.com"] },
  { entityId: "medtronic", domains: ["medtronic.com"] },
  { entityId: "jnj", domains: ["jnjmedtech.com"] },
  { entityId: "abbott", domains: ["abbott.com"] },
  { entityId: "boston-scientific", domains: ["bostonscientific.com"] },
  { entityId: "siemens-healthineers", domains: ["siemens-healthineers.com"] },
  { entityId: "ge-healthcare", domains: ["gehealthcare.com"] },
  { entityId: "philips", domains: ["philips.com"] },
  { entityId: "stryker", domains: ["stryker.com"] },
  { entityId: "zimmer-biomet", domains: ["zimmerbiomet.com"] },
  { entityId: "edwards", domains: ["edwards.com"] },
  { entityId: "roche-diagnostics", domains: ["roche.com"] },
  { entityId: "olympus", domains: ["olympus.com"] },
  { entityId: "fujifilm", domains: ["fujifilm.com"] },
  { entityId: "neusoft-medical", domains: ["neusoftmedical.com"] },
  { entityId: "sonoscape", domains: ["sonoscape.com"] },
];

/** 原文里的这些写法也算提到了对应公司。 */
export const IDENTITY_CONTEXT_ALIASES: ReadonlyArray<{ entityId: string; pattern: RegExp }> = [
  { entityId: "intuitive", pattern: /@IntuitiveSurg\b/i },
  { entityId: "medtronic", pattern: /@Medtronic\b/i },
];