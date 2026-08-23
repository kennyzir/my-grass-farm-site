# My Grass Farm — 彻底重构方案（第一性原理，非模板）

> 2026-08-24 用户拍板：忘掉 SOP 模板。从搜索意图、独特价值、更新信号、
> 内部主题图、数据实体、游戏工具/计算 六个维度彻底重构。
> 本文档是重构的唯一权威蓝图（替代旧 keyword-audit.md 的模板式 coverage 表）。

---

## 0. 为什么旧站必死（用户诊断，逐条坐实）

1. **每页第一屏是「开发者免责腔」**："How we verify: This is an unofficial
   fan resource…" 放所有页面最顶。用户搜 code 想看 code，看到的是自证声明。
   → 这是**给排名/审核看不给玩家看**，Google 也判为低价值。
2. **空洞/模板/开发腔句子遍布**："Focused fan wiki"、"Every claim traces to a
   dated official game page"、"claim state"、"This guide covers your first day"。
   → 不是玩家搜索词能命中的语言，是内部行话。
3. **页面按模板结构拼装**（Intro + 实体列表 + 卡片），不按玩家问题设计。
   → 无一个页面真正"比别人更好地满足某个搜索意图"。

## 1. 第一性原理：Google 凭什么收录并排名这个站

**唯一标准**：一个页面要在某个具体搜索意图上，比现有结果**更准、更快、更新鲜**。

不是"页数多"，不是"结构像 wiki"，是**每条搜索词 → 一个别人没答好的问题 → 我答得更直接**。

### 真实素材现实（决定一切的事实）

游戏 3 周龄，全网可验证的真实内容**极少**：
- 官方 desc（一段话，官方可验证）
- codes：`RELEASE`、`MERCHANT`（两个 creator 源交叉，社区报告、非官方确认）
- 离线机制（"workers cut grass while offline"，官方 desc + creator 双源）
- 官方数据：Tycoon / One More Grass / 798K visits / 2633 playing / 2026-07-23 创建
- 真实 creator 视频仅 ~4 个（0jim8W_7URc、9V7FZBetPXo、5ta1QVhlVM4、HoXCfKduRcI）

**结论：没有 rich wiki、没有已验证 tier list、没有独立数值表在任何网站存在。**
→ 排名的机会 = "把这个游戏真正有用的东西做深"，而不是铺 8 个空洞模板页。
→ 没有证据的（tier list、算钱工具、具体数值），诚实不造，而不是用模板话填。

## 2. 六维度重构方案

### 维度 1：搜索意图覆盖（每个页面只服务一个主意图，第一屏直接命中）

| 搜索意图（真实） | 用户此刻想要 | 页面 | 第一屏答案（不是免责声明） |
|---|---|---|---|
| my grass farm codes | 现在能用的 code + 在哪输 | /codes | 直接列 RELEASE / MERCHANT 两个 code（大字）+ "在哪兑换" |
| my grass farm how to | 第一分钟怎么玩 | /how-to-play | "进游戏先割草"第 1 步起步路线 |
| my grass farm release date | 什么时候出的 | /release-date | "2026年7月23日 上线"（日期直接当标题） |
| my grass farm (品牌) | 这游戏是啥、该不该玩 | / | 一句话说清 + "割草→干草→现金" 循环 + code 入口 |
| my grass farm update | 最近改了啥 | /updates | 诚实：官方不发布 patch notes，本页教你怎么辨别真改动 |
| my grass farm wiki | 全部信息导航 | /wiki | 主题图（各页一句话说明 + 锚文本），非卡片堆 |

**砍掉的页面**（模板硬造、无真实意图支撑、做了反扣分）：
- ❌ `best-blades`（无证据 tier list → 并入 how-to 的 FAQ："没有官方数值，别信标题党"）
- ❌ 独立 `guides`（与 how-to 重复 → 合并）

### 维度 2：独特价值（别人没有的）

别人（Pocket Codes 等）只给 code 字符串 + SEO 空壳。我的差异：
- **每个事实标注"官方确认"vs"社区报告"**（别人不区分，把社区 code 当官方吹）
- **离线机制的坑**（"workers 离线也在割草"→ 玩家真正的信息差）
- **诚实说"没有"**（tier list/数值不存在时直说，反成可信度护城河）

### 维度 3：更新信号（新鲜度 → 排名）

- 每个页顶部可见 `Last checked 日期`（已是 2026-08-23）
- codes 页标 `社区报告 date`，不标"官方"（避免虚假新鲜度）
- 后续可加 cron 自动刷新 codes/visits（现在先手写日期）

### 维度 4：内部主题图（锚文本内链，非卡片堆）

主题聚集（你 memory 里的 SOP 原则 + 本方案）：
```
/            首页（品牌 + 循环速览 + 入口）
├── /codes         ← 首页 hero 直链
├── /how-to-play   ← 首页 "怎么玩" 直链
├── /release-date  ← how-to 内链
├── /updates       ← 首页 "改了什么" 直链
└── /wiki          ← 主题 hub，向上述 4 页 + 首页 发锚文本内链
```
每页正文内自然插入 3-5 个**上下文锚文本**（"如何兑换 code"、"什么时候出的"），
不是页面底部一排 Link 卡片。

### 维度 5：数据实体（单一事实源 + 诚实 claim state）

`game-db.ts` 已建（hay/cash/blades/workers/farm + offline + 官方数据），保留。
但**页面正文不再把 "claim state" 这个词写给用户看**——它是内部字段，
面向用户只说人话（"官方描述" / "社区视频报告"）。

### 维度 6：游戏工具/计算（诚实评估：暂无）

- **没有已验证的数值公式** → 不做假计算器（那是 scaled content 红线）
- 唯一"工具感"价值 = codes 的"如何兑换"步骤 + how-to 的起步路线
- 未来官方/creator 给出 blade 价格/数值后，才加真实换算工具

## 3. 语言规范（彻底去开发腔）

❌ 禁用：
- "focused fan wiki" / "focused fan resource"
- "every claim traces to" / "claim state" / "claims"
- "This is an unofficial fan resource" 放首屏
- "Nothing here is invented"
- "carries its source and claim state"
- "an honest update-tracking page"（自己夸自己 honest）

✅ 改为玩家口吻（中文举例，英文对应）：
- "这些 code 是社区报告的最新可用 code"（而非"我们验证了 claim"）
- "游戏官方没发 patch notes，下面是辨别真改动的办法"
- 首屏直接给答案，来源/免责声明沉到页脚一行小字

## 4. 执行顺序（不套模板，逐页按意图重写）

1. `/codes`（最高意图：code）
2. `/how-to-play`（how to）
3. `/`（品牌 + 循环 + 入口）
4. `/release-date`（日期）
5. `/updates`（新鲜度/诚实）
6. `/wiki`（主题图收口）
7. 全站去免责首屏 + 语言规范统一
8. Gate1c + 部署

（本规划写好后，先重写 codes 做样板，符合预期再铺开——但用户已授权"全站推倒"，
故连续做完，只在中途用 codes 页自检。）
