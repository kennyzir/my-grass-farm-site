# V2 SOP 加固方案 —— 让「彻底重构」不可能退化成「改3个点」

> 2026-08-24 用户 mandate：我让「彻底重构」却只改了 3 个无关痛痒的点（codes/how-to 首屏 + 免责下沉）。
> 根因已诊断清楚，本文件是加固方案的权威记录。落地对象：SOP 顶栏 + 一个新增 gate 脚本。

---

## 一、根因诊断：不是 SOP 缺内容，是执行纪律断裂

SOP 其实已经写全了（关键词门/意图矩阵/证据门/深度门/内链图/主题聚集/模板腔 Gate 3/答案前置首屏规则全都在）。
但它是**软文档**，关键规则散落各处，执行时被降级成"可跳过的建议"。

三条具体断裂点（这次事故的机制层原因）：

1. **缺「重构判定」步** —— SOP 有「页面生产规则」和「首屏答案前置」，但**没有强制规定：
   当用户要求"彻底重构"时，必须先产出一页一页的全站意图审计表**（逐页列：本页服务的搜索意图 →
   当前首屏是否命中 → 要改成什么），而不是直接挑几段文案改。我这次就是跳过了审计，直接进了 codes/how-to。

2. **六维度没落成 checklist** —— 用户明示要从「搜索意图覆盖/独特价值/更新信号/内部主题图/
   数据实体/游戏工具计算」六维度重构。但这六维**分散在 SOP 各处**（意图矩阵在 skill A、
   内链图在 SOP 正文、工具层另起一节），没有**统一的全站六维审计清单**能在重构时逐项打勾。

3. **「答案前置/去模板腔」是文字规则，不是可执行 gate** —— Gate 3 的 marketing-copy check
   是**人肉判断**，无脚本强制。证据：现有 7 个 gate 脚本
   （keyword-mining / orphan_scan / render_qa_scan / scan_vague_shell / semantic_drift_scan /
   yt-content-miner / yt-entity-mining + site_audit.py）**没有一个查「首屏是否被免责声明挡住」**。
   所以「How we verify 免责声明顶首屏」能通过所有 gate 上线。

## 二、加固方案（三层，机制强制而非软提醒）

### 加固 1：SOP 顶栏加「REBUILD GATE」—— 用户说"重构/重做/彻底改"时强制执行

（patch 进 SOP 的 HARD START GATE 之后，同级最高优先）

```
REBUILD GATE (MANDATORY 2026-08-24, after my-grass-farm "改3点" failure):
when user says 重构/重做/彻底改/audit-and-rebuild — do NOT jump into editing pages.
FIRST produce a whole-site INTENT AUDIT TABLE (one row per page):
  page | search intent it serves | does the first-screen answer it? | gap | fix
Then run the SIX-DIMENSION checklist (below) against every page.
Only after BOTH are committed does page editing begin.
"改3点交差" is precisely the failure this gate exists to make impossible.
```

### 加固 2：六维度统一 checklist（重构前逐页打勾）

| # | 维度 | 判据（每页过一遍） | 当前站状态 |
|---|---|---|---|
| 1 | 搜索意图覆盖 | 每页只服务 1 个主意图，首屏/标题/H1 直接命中该词 | 部分（codes/how-to 已answer-first，rest 待审计）|
| 2 | 独特价值 | 这页给了竞品没有的一手信息（实测机制/诚实区分/来源）| 部分（离线机制、code 来源分层已注入）|
| 3 | 更新信号 | 可见 last-checked 日期 + game version | 有（但手写，未挂 cron）|
| 4 | 内部主题图 | 6-10 上下文锚文本内链（非底部卡片堆）| 缺失（仍是 Link 卡片为主）|
| 5 | 数据实体 | 单一事实源 + 每事实带 claimState/source | 有（game-db）+ 待把 claim 语义写成人话 |
| 6 | 游戏工具/计算 | 有验证数值才做真工具，无则诚实不做 | 待定（无已验证数值 → 不造假，用户拍板）|

### 加固 3：新 gate 脚本 `answer_first_scan.py`（机械拦截"免责/套话顶首屏"）

新增到 golden-template scripts，检查 BUILT export 的每个内容页：
- 首屏（`<main>` 前 N 个可见词）是否被**免责声明/自证/开发腔**占位（"How we verify"、
  "unofficial fan resource"、"This is an unofficial"、"Nothing here is invented"…）
- 首屏是否命中该页的**主搜索意图实体词**（codes 页要见 code，how-to 页要见动作动词，release 页要见日期）
- 输出 0 = 通过；命中 = 拒绝上线

（脚本实现在下一条 action 用 write_file 落地。）

## 三、为什么这能防止复发

- REBUILD GATE 强制「先出一页一页的意图审计表」→ 不可能再"只挑两页改文案"。
- 六维 checklist 强制「重构 = 六维全过」→ 不可能再"改了答案前置就当重构完成"。
- answer_first_scan.py 机械拦截「免责顶首屏」→ 这类病通过任何 gate 前就被挡。

## 四、My Grass Farm 站下一步（按此方案执行，不再是"改3点"）

1. 先产全站意图审计表（逐页：意图 → 首屏命中 → gap → fix）。
2. 逐页过六维 checklist，产出 gap 清单。
3. 按 gap 逐页重写（不是挑几段）。
4. 内链主题图重建（六维 #4，当前最大缺口）。
5. 全 gate（含新 answer_first_scan）跑绿。
6. deploy。
