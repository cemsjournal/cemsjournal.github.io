// =========================================================
// JoES Default Bilingual Content (EN + AR)
// =========================================================

window.JOES_DEFAULT_DATA = {
  settings: {
    abbr: "JoES",
    name_en: "Journal of Engineering & Medical Sciences",
    name_ar: "مجلة العلوم الهندسية والطبية",
    subtitle_en: "Peer-Reviewed Academic Journal · Academy of Engineering Sciences",
    subtitle_ar: "مجلة علمية محكّمة · أكاديمية العلوم الهندسية والطبية",
    banner_enabled: true,
    banner_text_en: "Stay tuned for the upcoming issue on 25/12/2026 — JoES",
    banner_text_ar: "ترقبوا العدد القادم بتاريخ 25/12/2026 — JoES",
    banner_date: "2026-12-25T00:00:00",
    whatsapp: "249900000000",
    phone: "+249900000000",
    email: "info@aes.edu.sd",
    website: "www.aes.edu.sd",
    auto_approve_comments: false
  },

  volumes: [
    { id: "vol-1", number: 1, title_en: "Volume 1", title_ar: "المجلد الأول (Volume 1)", sort_order: 1 },
    { id: "vol-2", number: 2, title_en: "Volume 2", title_ar: "المجلد الثاني (Volume 2)", sort_order: 2 },
    { id: "vol-3", number: 3, title_en: "Volume 3", title_ar: "المجلد الثالث (Volume 3)", sort_order: 3 },
    { id: "vol-4", number: 4, title_en: "Volume 4", title_ar: "المجلد الرابع (Volume 4)", sort_order: 4 }
  ],

  issues: [
    {
      id: "iss-v1-e1",
      volume_id: "vol-1",
      edition: 1,
      pub_date: "June 2018",
      title_en: "Volume 1 · Edition 1 — June 2018",
      title_ar: "المجلد الأول · العدد الأول — يونيو 2018",
      cover_url: "assets/img/cover-vol1.svg",
      pdf_en_url: "",
      pdf_ar_url: "",
      created_at: "2018-06-01T00:00:00Z"
    }
  ],

  board: [
    { id: "b-1", group: "leadership", role_en: "General Manager", role_ar: "المدير العام", name_en: "Prof. Mohamed Ali Bashir", name_ar: "أ.د. محمد علي بشير", affiliation_en: "Academy of Engineering Sciences", affiliation_ar: "أكاديمية العلوم الهندسية", sort_order: 1 },
    { id: "b-2", group: "leadership", role_en: "Editor-in-Chief", role_ar: "رئيس التحرير", name_en: "Mohamed Ali Bashir", name_ar: "محمد علي بشير", affiliation_en: "Journal of Engineering & Medical Sciences", affiliation_ar: "مجلة العلوم الهندسية والطبية", sort_order: 2 },
    { id: "b-3", group: "editors", role_en: "Associate Editor", role_ar: "المحرر المشارك", name_en: "Aatif Osman Altahir Abkar", name_ar: "عاطف عثمان الطاهر أبكر", affiliation_en: "Editorial Board", affiliation_ar: "هيئة التحرير", sort_order: 3 },
    { id: "b-4", group: "editors", role_en: "Editorial Assistant", role_ar: "مساعد التحرير", name_en: "Dr. Zeinab Mahmoud Omer", name_ar: "د. زينب محمود عمر", affiliation_en: "Editorial Board", affiliation_ar: "هيئة التحرير", sort_order: 4 },

    { id: "r-1", group: "reviewers", role_en: "Reviewer", role_ar: "محكّم علمي", name_en: "Prof. Khalid Hamid", name_ar: "أ.د. خالد حامد", affiliation_en: "", affiliation_ar: "", sort_order: 10 },
    { id: "r-2", group: "reviewers", role_en: "Reviewer", role_ar: "محكّم علمي", name_en: "Prof. Altahir Mohamed Alhassan", name_ar: "أ.د. الطاهر محمد الحسن", affiliation_en: "", affiliation_ar: "", sort_order: 11 },
    { id: "r-3", group: "reviewers", role_en: "Reviewer", role_ar: "محكّم علمي", name_en: "Prof. Mohamed Ali Bashir", name_ar: "أ.د. محمد علي بشير", affiliation_en: "", affiliation_ar: "", sort_order: 12 },
    { id: "r-4", group: "reviewers", role_en: "Reviewer", role_ar: "محكّم علمي", name_en: "Dr. Osman Al Aga", name_ar: "د. عثمان الآغا", affiliation_en: "", affiliation_ar: "", sort_order: 13 },
    { id: "r-5", group: "reviewers", role_en: "Reviewer", role_ar: "محكّم علمي", name_en: "Dr. Kamal Ramadan", name_ar: "د. كمال رمضان", affiliation_en: "", affiliation_ar: "", sort_order: 14 },
    { id: "r-6", group: "reviewers", role_en: "Reviewer", role_ar: "محكّم علمي", name_en: "Dr. Altayeb Alhaj", name_ar: "د. الطيب الحاج", affiliation_en: "", affiliation_ar: "", sort_order: 15 },
    { id: "r-7", group: "reviewers", role_en: "Reviewer", role_ar: "محكّم علمي", name_en: "Dr. Alfadil Zakaria", name_ar: "د. الفاضل زكريا", affiliation_en: "", affiliation_ar: "", sort_order: 16 },
    { id: "r-8", group: "reviewers", role_en: "Reviewer", role_ar: "محكّم علمي", name_en: "Dr. Zohair Mohamed Alhassan", name_ar: "د. زهير محمد الحسن", affiliation_en: "", affiliation_ar: "", sort_order: 17 },
    { id: "r-9", group: "reviewers", role_en: "Reviewer", role_ar: "محكّم علمي", name_en: "Dr. Naser Aldin Bashir", name_ar: "د. ناصر الدين بشير", affiliation_en: "", affiliation_ar: "", sort_order: 18 },
    { id: "r-10", group: "reviewers", role_en: "Reviewer", role_ar: "محكّم علمي", name_en: "Dr. Abdallah Bashir", name_ar: "د. عبدالله بشير", affiliation_en: "", affiliation_ar: "", sort_order: 19 },
    { id: "r-11", group: "reviewers", role_en: "Reviewer", role_ar: "محكّم علمي", name_en: "Ms. Gada Mohamed Ebrahim", name_ar: "أ. غادة محمد إبراهيم", affiliation_en: "", affiliation_ar: "", sort_order: 20 },
    { id: "r-12", group: "reviewers", role_en: "Reviewer", role_ar: "محكّم علمي", name_en: "Mr. Manajeb Nur Aldin", name_ar: "أ. مناجب نور الدين", affiliation_en: "", affiliation_ar: "", sort_order: 21 },
    { id: "r-13", group: "reviewers", role_en: "Reviewer", role_ar: "محكّم علمي", name_en: "Ms. Samah Osman Alsharif", name_ar: "أ. سماح عثمان الشريف", affiliation_en: "", affiliation_ar: "", sort_order: 22 }
  ],

  pages: {
    regulations: {
      title_en: "Publication Regulations & Author Guidelines",
      title_ar: "لوائح النشر وإرشادات المؤلفين",
      subtitle_en: "Official manuscript preparation, formatting, citation, and submission standards for JoES.",
      subtitle_ar: "المعايير الرسمية لإعداد المخطوطات وتنسيقها وتوثيق المراجع وتقديمها للنشر في المجلة.",
      body_en: `
<h2>1. Submission & Manuscript Types</h2>
<p>Authors should submit their manuscripts electronically in <strong>Microsoft Word</strong> or <strong>PDF</strong> format. JoES accepts four primary categories of scholarly manuscripts:</p>
<div class="spec-grid">
  <div class="spec-card"><strong>Regular Article</strong>Full-length original empirical investigations (Introduction, Materials &amp; Methods, Results &amp; Discussion, Conclusions) with significant new findings. <em>Limit: up to 5,000 words or 7–15 printed pages</em> (including abstract, references, tables, and figures).</div>
  <div class="spec-card"><strong>Short Communication</strong>Significant new technical advances in engineering, medical, or applied sciences presented in a concise, complete form for rapid publication (not preliminary results or abridged regular papers). <em>Limit: up to 2,000 words or 4 printed pages.</em></div>
  <div class="spec-card"><strong>Review Article</strong>Critical evaluation and synthesis of previously published research. Meta-analyses and systematic reviews are strongly encouraged. <em>Limit: up to 4,000 words or 7–8 printed pages.</em></div>
  <div class="spec-card"><strong>Special Issues</strong>Selected papers presented at recognized conferences, seminars, congresses, or symposia. <em>Limit: up to 5,000 words or 8–10 printed pages.</em></div>
</div>

<h2>2. Required Elements of a Manuscript (In Order)</h2>
<ol>
  <li><strong>Title</strong> (10–18 words, concise and informative).</li>
  <li><strong>Authors' Names &amp; Membership Status</strong>.</li>
  <li><strong>Affiliation &amp; Correspondence Address</strong> (including e-mail and postal address).</li>
  <li><strong>Abstract</strong>.</li>
  <li><strong>Keywords</strong>.</li>
  <li><strong>Body of the Manuscript</strong>.</li>
  <li><strong>Acknowledgments</strong> (if any).</li>
  <li><strong>References List</strong>.</li>
  <li><strong>Appendix</strong> (if any).</li>
</ol>

<h2>3. General Formatting Specifications</h2>
<table>
  <thead><tr><th>Specification</th><th>Standard Requirement</th></tr></thead>
  <tbody>
    <tr><td>Page Size &amp; Orientation</td><td>A4 Portrait</td></tr>
    <tr><td>Columns</td><td>Single-column format</td></tr>
    <tr><td>Margins</td><td>At least 2.5 cm on all sides</td></tr>
    <tr><td>Font Family &amp; Size</td><td>Times New Roman, 12-point</td></tr>
    <tr><td>Line Spacing</td><td>Single-spaced (employ italics rather than underlining, except for URLs)</td></tr>
    <tr><td>Placement of Figures &amp; Tables</td><td>Placed within the text at appropriate points rather than at the end</td></tr>
  </tbody>
</table>

<h2>4. Detailed Structure of Manuscript Sections</h2>
<ol>
  <li><strong>Running Title &amp; Author Page:</strong> Running title must not exceed 2 lines. Include the full paper title, all authors' names and institutions, and full contact details of the corresponding author (street address, telephone, mobile, and e-mail). Multiple affiliations must be marked with superscript numbers.</li>
  <li><strong>Abstract &amp; Keywords:</strong> Maximum 300 words for a Regular Paper (up to 100 words for Short Communications). Provide up to 6 keywords arranged in alphabetical order.</li>
  <li><strong>Main Text:</strong> Regular papers must follow the sequence: <em>Introduction, Materials and Methods, Results and Discussion, Conclusions</em>.</li>
  <li><strong>Tables:</strong> Prepared consistently with peer-reviewed journal standards, numbered consecutively with Arabic numerals, with explanatory notes in table legends and footnotes.</li>
  <li><strong>Equations &amp; Formulae:</strong> Clearly typeset; equation numbers must appear in brackets on the right margin.</li>
  <li><strong>Figures &amp; Photographs:</strong> Electronic figures must be high-resolution (TIFF format recommended for publication).</li>
  <li><strong>Units:</strong> Use Standard International (SI) units as primary units; secondary English units may appear in parentheses.</li>
</ol>

<h2>5. Citation &amp; Reference Guidelines</h2>
<p>In-text citations must include author surname(s) and reference number in square brackets. For more than two authors, use the first author followed by <em>et al.</em> — e.g., <em>Kheiralla and Tola [1] reported that...</em> or <em>Kheiralla et al. [2].</em> Only works cited in the text may appear in the References list.</p>
<table>
  <thead><tr><th>Source Type</th><th>Required Format</th></tr></thead>
  <tbody>
    <tr><td>Journal Papers</td><td>Authors, "Title of paper", <em>Journal Title</em>, Vol., No., Date, pp.</td></tr>
    <tr><td>Books</td><td>Authors, "<em>Title of Book</em>", Edition No., Vol., No., Date, pp.</td></tr>
    <tr><td>Conferences / Symposia</td><td>Authors, "Title of paper", "<em>Conference Title</em>", Sponsor, Vol., No., Place, Date, pp.</td></tr>
    <tr><td>Theses &amp; Dissertations</td><td>Author's name, "<em>Title of Thesis / Degree</em>", University &amp; Department, City &amp; Country, Year, pp.</td></tr>
  </tbody>
</table>

<h2>6. Submission Preparation Checklist</h2>
<ul class="checklist">
  <li>The submission has not been previously published, nor is it under consideration by another journal (or an explanation is provided in Comments to the Editor).</li>
  <li>The submission file is in Microsoft Word or PDF format.</li>
  <li>Where available, URLs for references have been provided.</li>
  <li>The text is single-spaced, uses a 12-point font, employs italics rather than underlining (except URLs), and places all figures and tables within the text.</li>
  <li>The text adheres to all stylistic and bibliographic requirements outlined above.</li>
  <li>For peer-reviewed sections, double-blind review anonymity instructions have been followed.</li>
</ul>`,
      body_ar: `
<h2>1. التقديم وأنواع المخطوطات المقبولة</h2>
<p>يُقدِّم المؤلفون مخطوطاتهم إلكترونياً بصيغة <strong>Microsoft Word</strong> أو <strong>PDF</strong>. وتقبل المجلة أربعة أنواع رئيسية من الأوراق العلمية:</p>
<div class="spec-grid">
  <div class="spec-card"><strong>البحث العلمي الأصيل (Regular Article)</strong>دراسة تجريبية أو تطبيقية متكاملة (المقدمة، المواد والطرق، النتائج والمناقشة، الخلاصة) تتضمن نتائج جديدة ومهمة. <em>الحد الأقصى: 5000 كلمة أو 7–15 صفحة مطبوعة</em> شاملة الملخص والمراجع والجداول والأشكال.</div>
  <div class="spec-card"><strong>الاتصال القصير (Short Communication)</strong>معلومة علمية أو تقنية جديدة ومكتملة للنشر السريع في مجالات الهندسة والتقنية والعلوم الطبية (وليس للنتائج الأولية أو تلخيص بحث كامل). <em>الحد الأقصى: 2000 كلمة أو 4 صفحات مطبوعة.</em></div>
  <div class="spec-card"><strong>المقالة المراجِعة (Review Article)</strong>تقييم نقدي وتحليل شامل لأبحاث منشورة سابقاً، ويُشجَّع فيها التحليل التجميعي (Meta-analysis) والمراجعات المنهجية. <em>الحد الأقصى: 4000 كلمة أو 7–8 صفحات مطبوعة.</em></div>
  <div class="spec-card"><strong>الأعداد الخاصة (Special Issues)</strong>أبحاث مختارة مقدَّمة في مؤتمرات أو ندوات أو ملتقيات علمية محكّمة. <em>الحد الأقصى: 5000 كلمة أو 8–10 صفحات مطبوعة.</em></div>
</div>

<h2>2. عناصر المخطوطة بالترتيب المطلوب</h2>
<ol>
  <li><strong>عنوان البحث</strong> (من 10 إلى 18 كلمة).</li>
  <li><strong>أسماء المؤلفين وصفاتهم العلمية</strong>.</li>
  <li><strong>جهة الانتماء وعنوان المراسلة</strong> (شاملاً البريد الإلكتروني والعنوان البريدي).</li>
  <li><strong>الملخص (Abstract)</strong>.</li>
  <li><strong>الكلمات المفتاحية (Keywords)</strong>.</li>
  <li><strong>متن المخطوطة</strong>.</li>
  <li><strong>الشكر والتقدير</strong> (إن وُجد).</li>
  <li><strong>قائمة المراجع</strong>.</li>
  <li><strong>الملاحق</strong> (إن وُجدت).</li>
</ol>

<h2>3. مواصفات التنسيق العام</h2>
<table>
  <thead><tr><th>البند</th><th>المتطلب المعتمد</th></tr></thead>
  <tbody>
    <tr><td>حجم الورق والاتجاه</td><td>A4 طولي (Portrait)</td></tr>
    <tr><td>الأعمدة</td><td>عمود واحد (Single Column)</td></tr>
    <tr><td>الهوامش</td><td>لا تقل عن 2.5 سم من جميع الجهات</td></tr>
    <tr><td>نوع وحجم الخط</td><td>Times New Roman بحجم 12 نقطة</td></tr>
    <tr><td>تباعد الأسطر</td><td>مفرد (يُستخدم الخط المائل بدلاً من التسطير إلا في روابط الإنترنت)</td></tr>
    <tr><td>موضع الأشكال والجداول</td><td>تُدرج داخل المتن في مواضعها المناسبة وليس في نهاية البحث</td></tr>
  </tbody>
</table>

<h2>4. تنظيم أجزاء المخطوطة</h2>
<ol>
  <li><strong>صفحة العنوان المختصر وبيانات المؤلفين:</strong> لا يتجاوز العنوان المختصر سطرين، وتضم الصفحة العنوان الكامل وأسماء المؤلفين ومؤسساتهم وبيانات المؤلف المراسل (العنوان، الهاتف، الجوال، البريد الإلكتروني). وعند تعدد المؤسسات تُميَّز بأرقام علوية.</li>
  <li><strong>الملخص والكلمات المفتاحية:</strong> لا يتجاوز الملخص 300 كلمة للبحث الأصلي (و100 كلمة للاتصال القصير)، وتُرفق 6 كلمات مفتاحية كحد أقصى مرتبة أبجدياً.</li>
  <li><strong>متن البحث:</strong> يُنظَّم البحث الأصلي وفق الترتيب: <em>المقدمة، المواد والطرق، النتائج والمناقشة، الخلاصة</em>.</li>
  <li><strong>الجداول:</strong> تُعدّ وفق معايير المجلات المحكّمة، وتُرقَّم تسلسلياً بالأرقام العربية مع وضع الشرح في عنوان الجدول وحواشيه.</li>
  <li><strong>المعادلات والصيغ الرياضية:</strong> تُكتب بوضوح، ويُوضع رقم المعادلة بين قوسين على الهامش.</li>
  <li><strong>الأشكال والصور:</strong> تُقدَّم إلكترونياً بدقة عالية (ويُفضَّل حفظها بصيغة TIFF للطباعة).</li>
  <li><strong>الوحدات:</strong> يُعتمد النظام الدولي للوحدات (SI) أساسياً، ويمكن وضع الوحدات الإنجليزية بين قوسين كوحدات ثانوية.</li>
</ol>

<h2>5. قواعد التوثيق والمراجع</h2>
<p>يُوثَّق المرجع داخل المتن بذكر اسم المؤلف ورقم المرجع بين قوسين مربعين، وإذا زاد عدد المؤلفين عن اثنين يُذكر الأول متبوعاً بعبارة <em>et al.</em> (مثال: <em>Kheiralla and Tola [1]</em> أو <em>Kheiralla et al. [2]</em>). وتقتصر قائمة المراجع على المصادر المشار إليها فعلياً في المتن.</p>
<table>
  <thead><tr><th>نوع المصدر</th><th>صيغة التوثيق المطلوبة</th></tr></thead>
  <tbody>
    <tr><td>الأوراق العلمية</td><td>المؤلفون، "عنوان الورقة"، <em>اسم المجلة</em>، المجلد، العدد، التاريخ، الصفحات.</td></tr>
    <tr><td>الكتب</td><td>المؤلفون، "<em>عنوان الكتاب</em>"، رقم الطبعة، المجلد، العدد، التاريخ، الصفحات.</td></tr>
    <tr><td>المؤتمرات والندوات</td><td>المؤلفون، "عنوان الورقة"، "<em>عنوان المؤتمر</em>"، الجهة الراعية، المجلد، العدد، المكان، التاريخ، الصفحات.</td></tr>
    <tr><td>الرسائل الجامعية</td><td>اسم الباحث، "<em>عنوان الرسالة والدرجة العلمية</em>"، الجامعة والقسم، المدينة والدولة، السنة، الصفحات.</td></tr>
  </tbody>
</table>

<h2>6. قائمة التحقق قبل الإرسال</h2>
<ul class="checklist">
  <li>لم يسبق نشر البحث، وليس مقدَّماً للنشر في أي مجلة أخرى (أو وُضّح ذلك في ملاحظات المحرر).</li>
  <li>ملف البحث بصيغة Microsoft Word أو PDF.</li>
  <li>إرفاق روابط الإنترنت للمراجع متى ما كانت متاحة.</li>
  <li>النص بتباعد مفرد وخط 12 نقطة، مع استخدام الخط المائل بدلاً من التسطير (باستثناء الروابط)، ووضع الأشكال والجداول في مواضعها داخل المتن.</li>
  <li>الالتزام التام بالمعايير الأسلوبية والببليوغرافية الموضحة في هذه اللائحة.</li>
  <li>اتباع تعليمات التحكيم العلمي الأعمى (إخفاء هوية المؤلفين) عند التقديم للأقسام المحكّمة.</li>
</ul>`
    },

    "applied-math": {
      title_en: "Applied Engineering & Mathematics: The Bridge Between Theory and Reality",
      title_ar: "الهندسة التطبيقية والرياضيات: الجسر بين النظرية والواقع",
      subtitle_en: "How mathematical modeling, differential equations, and numerical methods power modern engineering and medical breakthroughs.",
      subtitle_ar: "كيف تصنع النمذجة الرياضية والمعادلات التفاضلية والطرق العددية ثورة الهندسة والعلوم الطبية الحديثة.",
      body_en: `
<p>Mathematics has always been the universal language of science, yet nowhere is its transformative power more visible than in <strong>Applied Engineering and Medical Sciences</strong>. While pure mathematics explores abstract structures for their own beauty, applied mathematics translates physical, biological, and structural phenomena into equations that engineers and clinicians can solve, simulate, and optimize.</p>

<h2>1. Mathematical Modeling: Turning Reality into Equations</h2>
<p>Every major engineering system—from a suspension bridge resisting wind-induced resonance to an artificial heart valve regulating blood flow—begins as a <strong>mathematical model</strong>. Engineers express conservation laws (mass, momentum, and energy) using partial differential equations (PDEs) such as the Navier–Stokes equations for fluid dynamics or Maxwell's equations for electromagnetics.</p>

<h2>2. Key Mathematical Pillars in Modern Engineering</h2>
<ul>
  <li><strong>Linear Algebra &amp; Matrix Computation:</strong> Powers structural Finite Element Analysis (FEA), electrical circuit networks, robotic kinematics, and medical image reconstruction (CT and MRI).</li>
  <li><strong>Differential Equations &amp; Control Theory:</strong> Essential for designing stable aircraft autopilots, biomedical insulin pumps, and smart power-grid controllers.</li>
  <li><strong>Probability, Statistics &amp; Stochastic Processes:</strong> Forms the backbone of reliability engineering, signal denoising, clinical trial validation, and epidemiological modeling.</li>
  <li><strong>Optimization &amp; Operations Research:</strong> Enables minimum-weight aerospace structures, optimal hospital resource scheduling, and energy-efficient manufacturing.</li>
</ul>

<h2>3. Numerical Methods &amp; Computational Simulation</h2>
<p>Real-world geometries and nonlinear materials rarely admit exact closed-form solutions. Numerical methods—such as <strong>Finite Element Method (FEM)</strong>, <strong>Finite Volume Method (FVM)</strong>, and <strong>Monte Carlo simulations</strong>—discretize complex domains into millions of elements solved on high-performance computers. In biomedical engineering, this allows researchers to test stent designs or prosthetic implants virtually before a single physical prototype is built.</p>

<h2>4. Convergence with Artificial Intelligence</h2>
<p>Today, classical applied mathematics is merging with machine learning to create <strong>Physics-Informed Neural Networks (PINNs)</strong>. By embedding physical differential equations directly into neural network loss functions, engineers achieve rapid, accurate predictions even when experimental data is scarce.</p>

<p><em>In summary, mastery of applied mathematics is not merely an academic requirement—it is the indispensable toolkit that turns engineering imagination into safe, reliable, and life-saving technology.</em></p>`,
      body_ar: `
<p>لطالما كانت الرياضيات اللغة الكونية للعلوم، غير أن أثرها التحويلي يتجلى بأوضح صوره في <strong>الهندسة التطبيقية والعلوم الطبية</strong>. فبينما تبحث الرياضيات البحتة في البنى المجردة لجمالها الذاتي، تترجم الرياضيات التطبيقية الظواهر الفيزيائية والحيوية والإنشائية إلى معادلات يمكن للمهندسين والأطباء حلّها ومحاكاتها وتحسينها على أرض الواقع.</p>

<h2>1. النمذجة الرياضية: تحويل الواقع إلى معادلات</h2>
<p>كل منظومة هندسية كبرى — بدءاً من جسرٍ معلّق يقاوم اهتزازات الرياح وصولاً إلى صمام قلب اصطناعي ينظّم تدفق الدم — تبدأ أولاً كـ <strong>نموذج رياضي</strong>. يعبّر المهندسون عن قوانين حفظ الكتلة والزخم والطاقة عبر المعادلات التفاضلية الجزئية (PDEs)، مثل معادلات نافييه–ستوكس لديناميكا الموائع أو معادلات ماكسويل للكهرومغناطيسية.</p>

<h2>2. الركائز الرياضية الأساسية في الهندسة الحديثة</h2>
<ul>
  <li><strong>الجبر الخطي والمصفوفات:</strong> العمود الفقري لتحليل العناصر المحدودة (FEA) في المنشآت، وتحليل الدوائر الكهربائية، وحركة الروبوتات، وإعادة بناء الصور الطبية في الأشعة المقطعية (CT) والرنين المغناطيسي (MRI).</li>
  <li><strong>المعادلات التفاضلية ونظرية التحكم:</strong> أساس تصميم أنظمة الطيران الآلي، ومضخات الأنسولين الذكية، ومنظمات استقرار الشبكات الكهربائية.</li>
  <li><strong>الاحتمالات والإحصاء والعمليات العشوائية:</strong> جوهر هندسة الموثوقية، وتنقية الإشارات الطبية، وتحليل التجارب السريرية، ونمذجة انتشار الأوبئة.</li>
  <li><strong>الأمثلة (Optimization) وبحوث العمليات:</strong> تتيح تصميم هياكل أخف وزناً وأعلى متانة، وجدولة غرف العمليات والموارد الهندسية بأقل تكلفة.</li>
</ul>

<h2>3. الطرق العددية والمحاكاة الحاسوبية</h2>
<p>نادراً ما تقبل المسائل الهندسية الواقعية حلولاً تحليلية مغلقة بسبب تعقيد الأشكال ولاخطية المواد. وهنا تأتي الطرق العددية مثل <strong>طريقة العناصر المحدودة (FEM)</strong> و<strong>طريقة الحجوم المحدودة (FVM)</strong> ومحاكاة <strong>مونت كارلو</strong>، لتقسيم المجسمات المعقدة إلى ملايين العناصر وحلّها حاسوبياً. وفي الهندسة الطبية الحيوية، يتيح ذلك اختبار الدعامات القلبية والمفاصل الصناعية افتراضياً قبل تصنيع أي نموذج مادي.</p>

<h2>4. الالتقاء مع الذكاء الاصطناعي</h2>
<p>يشهد عصرنا اندماجاً متسارعاً بين الرياضيات التطبيقية الكلاسيكية وتعلّم الآلة عبر ما يُعرف بـ <strong>الشبكات العصبية المقيَّدة بالفيزياء (PINNs)</strong>، حيث تُدمج المعادلات التفاضلية مباشرة داخل خوارزميات التعلّم، مما يمكّن المهندسين من التنبؤ الدقيق بسلوك الأنظمة المعقدة حتى مع محدودية البيانات التجريبية.</p>

<p><em>خلاصة القول: إن إتقان الرياضيات التطبيقية ليس مجرد متطلب نظري، بل هو الأداة الجوهرية التي تحوّل الفكرة الهندسية إلى تقنية آمنة وموثوقة تخدم الإنسان وترتقي بحياته.</em></p>`
    },

    info: {
      title_en: "Information of Interest for Researchers",
      title_ar: "معلومات قد تهمك في البحث والنشر العلمي",
      subtitle_en: "Practical guidance on academic publishing, peer review ethics, and manuscript visibility.",
      subtitle_ar: "إرشادات عملية حول النشر الأكاديمي وأخلاقيات التحكيم العلمي ورفع جودة الورقة البحثية.",
      body_en: `
<h2>Choosing the Right Research Scope</h2>
<p>Before drafting your manuscript, ensure your topic aligns with JoES's interdisciplinary scope spanning Civil, Electrical, Mechanical, Chemical, Computer, and Biomedical Engineering as well as Applied Medical Sciences.</p>
<h2>Tips for Passing Peer Review Smoothly</h2>
<ul>
  <li>State a clear research gap and measurable objective in the final paragraph of your Introduction.</li>
  <li>Ensure all figures are legible, high-resolution, and carry descriptive captions.</li>
  <li>Double-check that every in-text citation matches an entry in the References list.</li>
  <li>Proofread language and SI units carefully prior to submission.</li>
</ul>`,
      body_ar: `
<h2>اختيار نطاق البحث المناسب</h2>
<p>قبل البدء في كتابة بحثك، تأكد من توافق موضوعه مع نطاق مجلة JoES الذي يغطي الهندسة المدنية والكهربائية والميكانيكية والكيميائية وهندسة الحاسوب والهندسة الطبية الحيوية والعلوم الطبية التطبيقية.</p>
<h2>نصائح لاجتياز التحكيم العلمي بنجاح</h2>
<ul>
  <li>وضّح الفجوة البحثية وهدف الدراسة بدقة في الفقرة الأخيرة من المقدمة.</li>
  <li>تأكد من وضوح الأشكال البيانية ودقتها العالية ووجود عناوين شارحة لها.</li>
  <li>طابق جميع الإشارات المرجعية داخل المتن مع قائمة المراجع في النهاية.</li>
  <li>راجع الصياغة اللغوية ووحدات القياس الدولية (SI) بعناية قبل الإرسال.</li>
</ul>`
    }
  },

  videos: [
    {
      id: "vid-1",
      title_en: "Academy of Engineering & Medical Sciences — Introductory Lecture",
      title_ar: "أكاديمية العلوم الهندسية والطبية — المحاضرة التعريفية الأولى",
      description_en: "Inspired by the Academy's educational portal. Replace this link anytime from the Admin Panel with your YouTube or Google Drive video URL.",
      description_ar: "مستلهمة من البوابة التعليمية لأكاديمية العلوم الهندسية والطبية. يمكنك وضع رابط الفيديو المباشر (يوتيوب أو جوجل درايف) في أي وقت من لوحة المدير.",
      url: "https://elearnacademysciences.blogspot.com/?m=1",
      category: "both", // "featured" | "lectures" | "both"
      created_at: "2026-11-19T00:00:00Z"
    }
  ],

  links: [],

  comments: []
};
