// تعريف المتغيرات العامة
let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
let isGridView = localStorage.getItem('viewMode') !== 'list';
let audioEnabled = localStorage.getItem('audioEnabled') !== 'false';
let clickSound;

// مصفوفات المحتوى لكل قسم مع 20 جملة إضافية
const contentData = {
    new: [
        "حكمة جديدة: الصبر مفتاح الفرج.",
        "دعاء جديد: اللهم اغفر لي وارحمني."
    ],
    hikam: [
        "لا تنتظر اللحظة المثالية، خذ اللحظة التي لديك واجعلها مثالية.",
        "العقل السليم في الجسم السليم.",
        "الحياة رحلة وليست وجهة.",
        "من يزرع الخير يحصد السعادة.",
        "العلم نور والجهل ظلام.",
        "الوقت كالذهب إن لم تستغله ضاع.",
        "التفاؤل هو الإيمان بأن كل شيء سيكون على ما يرام.",
        "من جد وجد ومن زرع حصد.",
        "الصبر عند المصيبة عبادة.",
        "الحكمة ضالة المؤمن.",
        "العمل الجاد يتفوق على الموهبة.",
        "الصدق ينجي ولو بعد حين.",
        "الكلمة الطيبة صدقة.",
        "من عرف نفسه عرف ربه.",
        "النجاح لا يأتي بالتمني بل بالعمل.",
        "الحياة مدرسة والتجارب دروسها.",
        "الصمت حكمة إذا كان الكلام فضة.",
        "القلب السليم هو الأغنى.",
        "من ترك شيئًا لله عوضه الله خيرًا منه.",
        "العقل زينة الإنسان.",
        "الحياة قصيرة فاستغلها في الخير.",
        "التواضع يرفع والكبر يضع."
    ],
    azkar: [
        "اللهم اجعل هذا التطبيق صدقة جارية...",
        "اللهم ارزقني رزقًا حلالًا طيبًا.",
        "اللهم أعني على ذكرك وشكرك.",
        "اللهم ثبتني على الحق.",
        "اللهم اغفر لي ذنبي كله.",
        "اللهم اجعلني من الصابرين.",
        "اللهم ارحمني برحمتك الواسعة.",
        "اللهم سدد خطاي وأصلح حالي.",
        "اللهم ارزقني الإخلاص في القول والعمل.",
        "اللهم اجعل لي نورًا في قلبي.",
        "اللهم اهدني وسددني.",
        "اللهم اجعلني من الشاكرين.",
        "اللهم أعني على طاعتك.",
        "اللهم اجعل القرآن ربيع قلبي.",
        "اللهم ارزقني الصحة والعافية.",
        "اللهم احفظني من بين يدي ومن خلفي.",
        "اللهم اجعلني من المقيمين للصلاة.",
        "اللهم ارزقني حبك وحب من يحبك.",
        "اللهم اجعلني من التائبين.",
        "اللهم ارزقني الجنة وما يقربني إليها.",
        "اللهم اجعلني مباركًا أينما كنت.",
        "اللهم استر عيوبي وآمن روعاتي."
    ],
    quotes: [
        "الحياة مليئة بالدروس والعبر...",
        "الأمل هو الضوء الذي ينير الظلام.",
        "كل بداية صعبة تنتهي بنهاية مشرفة.",
        "السعادة ليست في المال بل في القناعة.",
        "الحب هو أن ترى الجمال في كل شيء.",
        "الصبر طريق النجاة.",
        "الحياة لحظات فاجعلها ذكرى جميلة.",
        "الإيمان هو القوة التي تحملك.",
        "الابتسامة لغة لا تحتاج ترجمة.",
        "كل شيء يمر والأمل يبقى.",
        "الحياة فرصة فلا تضيعها.",
        "الخير في الناس ما داموا يعطون.",
        "القلب النقي يرى الجمال في كل مكان.",
        "النجاح حلم يبدأ بخطوة.",
        "الصمت أحيانًا أبلغ من الكلام.",
        "الحياة كتاب فاكتب فيه ما يُشرفك.",
        "العقل هو البوصلة في بحر الحياة.",
        "الأحلام لا تموت ما دامت الروح حية.",
        "السعادة قرار وليست صدفة.",
        "كل يوم هو فرصة للتغيير.",
        "الإنسان هو ما يصنعه من نفسه.",
        "الرضا كنز لا يفنى."
    ],
    qisas: [
        "قصة الصبر: كان هناك رجل صبور انتظر سنوات حتى تحقق حلمه...",
        "قصة الوفاء: صديقان ظلا متمسكين بوعدهما رغم المسافات.",
        "قصة العطاء: رجل فقير أعطى كل ما يملك فكافأه الله.",
        "قصة الأمل: فتاة لم تيأس رغم الظروف فتحقق حلمها.",
        "قصة الشجاعة: محارب واجه مخاوفه وانتصر.",
        "قصة التوبة: شاب عاد إلى الله بعد ضلال.",
        "قصة الكرم: رجل آوى غريبًا فأصبح صديقه.",
        "قصة الصدق: طفل قال الحقيقة فأنقذ قريته.",
        "قصة الإخلاص: عامل بنى بيتًا بإتقان فكان الأجمل.",
        "قصة الحلم: فتى فقير أصبح عالمًا بفضل إصراره.",
        "قصة العفو: رجل سامح من أساء إليه فوجد السلام.",
        "قصة الجهد: امرأة عملت بجد فأطعمت أسرتها.",
        "قصة الثقة: بحار وثق بربه فنجا من العاصفة.",
        "قصة التعاون: أصدقاء بنوا جسرًا معًا.",
        "قصة العبرة: رجل خسر كل شيء فعرف قيمته.",
        "قصة الإرادة: معاق أكمل تعليمه رغم الصعوبات.",
        "قصة الوفاء: كلب ظل ينتظر صاحبه سنوات.",
        "قصة الحكمة: شيخ علّم قومه الصبر فازدهروا.",
        "قصة الأمانة: تاجر رد الأمانة فكسب الثقة.",
        "قصة النور: رجل أضاء طريق الآخرين فوجد طريقه.",
        "قصة الخير: امرأة زرعت شجرة فأثمرت للجميع.",
        "قصة الإيمان: رجل تمسك بدينه فنجا."
    ],
    mawaez: [
        "تذكر دائماً أن الصبر يجلب الخير.",
        "من توكل على الله كفاه.",
        "الدنيا دار ممر وليست دار مقر.",
        "القلب الطاهر هو الأقرب إلى الله.",
        "التواضع يرفع الإنسان.",
        "من ترك الدنيا أتته.",
        "الصلاة مفتاح النجاة.",
        "الصدقة تطفئ الغضب.",
        "الإيمان بالله يزيل الخوف.",
        "العمل الصالح هو الرفيق الأبدي.",
        "الصمت يحمي من الزلل.",
        "من أحسن إلى الناس أحسن الله إليه.",
        "القناعة تجعلك غنيًا.",
        "الحياة اختبار فاصبر.",
        "الدعاء يغير الأقدار.",
        "من تذلل لله رفع الله قدره.",
        "الخير في الإحسان إلى الضعفاء.",
        "الرضا يجلب السكينة.",
        "العلم ينير الطريق.",
        "من اتقى الله جعل له مخرجًا.",
        "السعادة في طاعة الله.",
        "الحياة أمانة فحافظ عليها."
    ],
    atab: [
        "لماذا تغيب عني وأنا أنتظرك كل يوم؟",
        "كنت أظنك الصديق الذي لا ينسى.",
        "لماذا تركتني في وقت حاجتي؟",
        "كنت أتمنى أن تكون بجانبي.",
        "أين وعدك الذي قطعته لي؟",
        "لماذا صمت وأنا أحتاج كلامك؟",
        "كنت أراك الأقرب فأصبحت الأبعد.",
        "لماذا لم تعرف قيمتي إلا بعد رحيلي؟",
        "كنت أثق بك فخيبت ظني.",
        "لماذا تجاهلتني وأنا أناديك؟",
        "كنت أحسبك سندي فأصبحت وحدي.",
        "أين كنت حين كنت أبحث عنك؟",
        "لماذا أعطيتني أملًا ثم سحبته؟",
        "كنت أظنك مختلفًا عن الجميع.",
        "لماذا نسيتني وأنا لم أنساك؟",
        "كنت أنتظر عذرًا فلم أجد.",
        "لماذا أصبحت غريبًا بعد قرب؟",
        "كنت أحسبك الحياة فخسرتها.",
        "لماذا تركت قلبي ينتظر عبثًا؟",
        "كنت أراك نورًا فأظلمت طريقي.",
        "لماذا أعطيتني الوعود ولم تفِ؟",
        "كنت أحسبك الأمان فأصبحت الخوف."
    ],
    iqubasat: [
        "النجاح ليس المفتاح للسعادة، السعادة هي المفتاح للنجاح. - ألبرت أينشتاين",
        "الحياة مثل المرآة، تحصل على أفضل النتائج عندما تبتسم لها.",
        "الوقت هو أثمن ما يملك الإنسان. - سقراط",
        "من لا يخاطر لا يفوز. - مثل فرنسي",
        "الحياة قصيرة فلا تضيعها في الحقد. - شكسبير",
        "المعرفة قوة. - فرانسيس بيكون",
        "الصبر هو أفضل دواء لكل مشكلة. - بلوتارخ",
        "العقل هو كل شيء، ما تعتقده تصبح عليه. - بوذا",
        "الحب هو الحياة في أجمل صورها. - جبران خليل جبران",
        "النجاح هو الانتقال من فشل إلى فشل دون فقدان الحماس. - تشرشل",
        "العمل هو سر النجاح. - بيكاسو",
        "الحياة مغامرة يجب أن تعيشها. - هيلين كيلر",
        "الأمل هو الحلم الذي يوقظك. - أرسطو",
        "الصداقة كنز لا يفنى. - مثل عربي",
        "السعادة ليست في ما تملك بل في ما تشعر به. - تولستوي",
        "الصمت هو أعلى أصوات الحكمة. - مثل صيني",
        "العقل الناضج لا يبحث عن المستحيل. - كونفوشيوس",
        "الحياة لعبة شطرنج، فكر قبل أن تتحرك. - نابليون",
        "الإنسان هو ما يصنعه من نفسه. - جان بول سارتر",
        "الخير هو أن تعطي أكثر مما تأخذ. - أفلاطون",
        "الوقت هو الحياة، فلا تهدره. - بنجامين فرانكلين",
        "الحياة تحتاج قلبًا شجاعًا. - جاك لندن"
    ],
    qissaWaIbra: [
        "قصة الفقير والملك: فقير ساعد ملكاً فأصبح غنياً بفضل أمانته.",
        "قصة الكنز: رجل بحث عن كنز فوجده في قلبه.",
        "قصة الشجرة: زرعها رجل فأثمرت بعد سنوات.",
        "قصة الصياد: صبر على البحر فصاد أكبر سمكة.",
        "قصة الغريب: ساعد قرية فأصبح ملكها.",
        "قصة الفتى: تعلم من أخطائه فنجح.",
        "قصة الأم: ضحت لأجل أبنائها فكافأها الله.",
        "قصة التاجر: خسر ماله فعرف قيمة العائلة.",
        "قصة العصفور: أنقذته فتاة فحماها لاحقًا.",
        "قصة الحلم: فتاة آمنت بحلمها فتحقق.",
        "قصة الصبر: رجل انتظر المطر فأثمر زرعه.",
        "قصة الصداقة: أنقذ صديق صديقه فازدادت محبتهم.",
        "قصة الرحلة: رجل سافر فتعلم الحكمة.",
        "قصة العطاء: أعطى فقير كل شيء فوجد السعادة.",
        "قصة النهر: عبره رجل فوجد السلام.",
        "قصة الضوء: أضاء رجل مصباحًا فأنقذ قريته.",
        "قصة الكتاب: قرأه شاب فغير حياته.",
        "قصة الجسر: بناه رجل فوحد القرى.",
        "قصة الأمل: فتاة لم تيأس فوجدت النور.",
        "قصة الإخلاص: عمل رجل بجد فكافأه الله.",
        "قصة القلب: سامح صاحبه فوجد الراحة.",
        "قصة النجاح: بدأت بخطوة صغيرة فأصبحت عظيمة."
    ],
    amthalShaabiya: [
        "من جد وجد.",
        "اللي ما يعرف الصقر يشويه.",
        "الوقت كالسيف إن لم تقطعه قطعك.",
        "كل تأخيرة فيها خيرة.",
        "الباب اللي يجيك منه الريح سده واستريح.",
        "اللي ما يعرفك ما يثمنك.",
        "الجار قبل الدار.",
        "الصبر طيب.",
        "اللي في القلب في القلب.",
        "الحي يحييك والميت يزيدك غبن.",
        "العين ما تعلى على الحاجب.",
        "اللي ما له أول ما له تالي.",
        "يد واحدة ما تصفق.",
        "القلوب عند بعضها.",
        "من طلب العلا سهر الليالي.",
        "اللي ما يشوف من الغربال أعمى.",
        "كل فتاة بأبيها معجبة.",
        "الناس عينين والحق عين.",
        "اللي يخاف من العفريت يطلع له.",
        "الرجال رجال ولو قلوا.",
        "البعد جفاء.",
        "النار ما تحرق إلا رجل واطيها."
    ],
    hurufDhahabiya: [
        "الصمت في بعض الأحيان هو أبلغ رد.",
        "كلمة واحدة قد تغير مصير إنسان.",
        "الحب كنز لا يفنى.",
        "الصدق نور يهدي القلوب.",
        "الصبر مفتاح كل باب.",
        "الإيمان هو القوة الحقيقية.",
        "العقل زينة الروح.",
        "الحياة لحظات فاجعلها ذهبية.",
        "التواضع يرفع القامات.",
        "الكلمة الطيبة جوهرة.",
        "الأمل شعاع في الظلام.",
        "الصداقة وردة لا تذبل.",
        "العمل هو الحياة.",
        "الرضا هو السعادة الحقيقية.",
        "النية الصافية تبني الجسور.",
        "الحكمة نور العقل.",
        "الوقت ثروة لا تعوض.",
        "الإخلاص يجعل العمل عظيمًا.",
        "القلب السليم هو الأغنى.",
        "الحياة كتاب فاكتب فيه الخير.",
        "الابتسامة مفتاح القلوب.",
        "العطاء هو أجمل لغة."
    ],
    iitizar: [
        "أعتذر إن أخطأت بحقك يوماً.",
        "سامحني فالقلب لا يقصد الإساءة.",
        "أعتذر عن صمتي إن كان قد أزعجك.",
        "آسف إن نسيت وعدًا قطعته لك.",
        "أرجو أن تسامحني على تقصيري.",
        "أعتذر إن كنت سبب حزنك.",
        "سامحني فقد كنت مشغولًا عنك.",
        "أعتذر إن لم أكن عند حسن ظنك.",
        "آسف إن جرحتك بكلمة دون قصد.",
        "أرجو أن تقبل اعتذاري المتواضع.",
        "أعتذر عن بعدي فالظروف أقوى مني.",
        "سامحني إن كنت قاسيًا يومًا.",
        "أعتذر إن لم أعبر عن مشاعري.",
        "آسف إن تركتك تنتظر طويلًا.",
        "أرجو أن تسامحني على زلتي.",
        "أعتذر إن كنت أنانيًا دون أن أدري.",
        "سامحني فأنت أغلى من أن أخسرك.",
        "أعتذر إن لم أكن الصديق الذي تتمناه.",
        "آسف إن نسيت يومًا أن أسأل عنك.",
        "أرجو أن تقبل اعتذاري فأنت عزيز.",
        "أعتذر إن كنت سبب دمعة في عينيك.",
        "سامحني فالحياة علمتني درسًا."
    ],
    rasail: [
        "رسالة إلى صديق: أنت نعمة في حياتي.",
        "رسالة إلى أمي: أنتِ نور دربي.",
        "رسالة إلى نفسي: لا تيأس أبدًا.",
        "رسالة إلى أبي: شكرًا على كل شيء.",
        "رسالة إلى أخي: أنت سندي دائمًا.",
        "رسالة إلى الحياة: سأعيشك بأمل.",
        "رسالة إلى قلبي: اصبر فالخير قادم.",
        "رسالة إلى صديقي: أنت الأخ الثاني.",
        "رسالة إلى المعلم: شكرًا على علمك.",
        "رسالة إلى الحب: أنت أجمل شعور.",
        "رسالة إلى الغائب: أفتقدك كثيرًا.",
        "رسالة إلى الوطن: أنت في القلب دائمًا.",
        "رسالة إلى الصباح: أنت بداية الأمل.",
        "رسالة إلى الليل: احمل أحلامي برفق.",
        "رسالة إلى السماء: ارفعي دعائي.",
        "رسالة إلى الروح: كوني نقية دائمًا.",
        "رسالة إلى الزمن: علمني الصبر.",
        "رسالة إلى الشمس: أضيئي طريقي.",
        "رسالة إلى القمر: أنت رفيق وحدتي.",
        "رسالة إلى الجميع: كونوا بخير.",
        "رسالة إلى القدر: أثق بك دائمًا.",
        "رسالة إلى الإيمان: أنت قوتي."
    ],
    maqulat: [
        "العقل هو السلاح الأقوى في الحياة.",
        "العمل الجاد يهزم الموهبة إذا لم تُستغل.",
        "الحياة تحتاج إلى قلب شجاع.",
        "الصبر هو أساس كل نجاح.",
        "الإيمان يبني الجسور.",
        "العلم هو السلم إلى المجد.",
        "الصدق هو أقصر طريق إلى القلوب.",
        "الحب هو لغة الروح.",
        "الوقت هو أثمن عملة.",
        "التواضع هو زينة العظماء.",
        "النجاح هو ثمرة الصبر.",
        "الحياة قصيرة فاجعلها ذات معنى.",
        "العقل هو كنز لا يُسرق.",
        "الأمل هو وقود الحياة.",
        "الإخلاص هو سر التميز.",
        "السعادة في العطاء لا الأخذ.",
        "الحكمة هي أن تعرف متى تصمت.",
        "العمل هو الحياة الحقيقية.",
        "القلب النقي هو الأجمل.",
        "الإرادة تصنع المعجزات.",
        "الحياة درس فتعلمه.",
        "الرضا هو السعادة الحقة."
    ],
    kalimaTayyiba: [
        "كلمة طيبة تصنع يوماً سعيداً.",
        "ابتسم فالابتسامة صدقة.",
        "شكرًا كلمة تجلب الخير.",
        "السلام يبدأ من كلمة.",
        "أحبك كلمة تزيل الهم.",
        "سامحني كلمة تبني الجسور.",
        "مبارك كلمة تجلب الفرح.",
        "أنت مميز كلمة ترفع المعنويات.",
        "الحمد لله كلمة تملأ القلب.",
        "جزاك الله خيرًا كلمة طيبة.",
        "كن بخير كلمة تحمل الأمل.",
        "أقدرك كلمة تعزز الثقة.",
        "صباح الخير كلمة تبدأ اليوم.",
        "كفى كلمة توقف الشر.",
        "أنت كافٍ كلمة تدعم الروح.",
        "الحياة جميلة كلمة تزرع التفاؤل.",
        "شجاع كلمة تحفز العزيمة.",
        "أنت نور كلمة تضيء القلوب.",
        "كل شيء بخير كلمة تهدئ النفس.",
        "أنا معك كلمة تعطي الأمان.",
        "أنت قوي كلمة تبني الثقة.",
        "الخير قادم كلمة تحمل الأمل."
    ],
    philosophy: [
        "الحياة لغز ان لم تحله حلك »»» سقراط",
        "أعرف نفسك بنفسك »»» أرسطو",
        "السعادة غاية بحد ذاتها »»» أفلاطون",
        "الإنسان هو ما يفكر فيه »»» ماركوس أوريليوس",
        "الحياة ليست عادلة »»» نيتشه",
        "المعرفة هي القوة الحقيقية »»» هوبز",
        "الوجود يسبق الماهية »»» سارتر",
        "الصمت هو أعلى أشكال التفكير »»» كونفوشيوس",
        "الحياة مسرحية نكتبها »»» شكسبير",
        "العقل هو كل شيء »»» ديكارت",
        "السعادة في القناعة »»» أبيقور",
        "الحياة لعبة مصير »»» هيراقليطس",
        "الإنسان حيوان عاقل »»» أرسطو",
        "الحقيقة نسبية »»» بروتاغوراس",
        "الوقت هو الحياة »»» سينيكا",
        "العقل يرى ما يريد »»» كانط",
        "الحياة رحلة بحث »»» زينون",
        "الإنسان يعيش ليفكر »»» باسكال",
        "السعادة اختيار »»» أرسطو",
        "الحياة حلم نصنعه »»» كالديرون",
        "العقل هو الحرية »»» هيغل",
        "الحياة سؤال بلا جواب »»» كامو"
    ]
};

// إنشاء كائن صوتي باستخدام ملف خارجي
function initializeAudio() {
    clickSound = new Audio('https://www.soundjay.com/buttons/sounds/button-30.mp3');
    clickSound.preload = 'auto';
    clickSound.oncanplaythrough = () => console.log("الصوت جاهز للتشغيل");
    clickSound.onerror = () => showNotification("فشل تحميل الملف الصوتي. تحقق من الاتصال.", 3000);
}

// دالة تشغيل الصوت للأزرار فقط
function playClickSound() {
    if (audioEnabled) {
        clickSound.currentTime = 0;
        clickSound.play()
            .catch(error => {
                console.error("خطأ في تشغيل الصوت:", error);
                showNotification("فشل تشغيل الصوت: " + error.message, 3000);
            });
    }
}

// دالة التحكم في تشغيل/إيقاف الصوت
function toggleAudio() {
    audioEnabled = !audioEnabled;
    const audioToggle = document.getElementById('audioToggle');
    audioToggle.innerHTML = audioEnabled 
        ? '<i class="fas fa-volume-up"></i> تشغيل الصوت' 
        : '<i class="fas fa-volume-mute"></i> إيقاف الصوت';
    localStorage.setItem('audioEnabled', audioEnabled);
    showNotification(audioEnabled ? "تم تفعيل الصوت!" : "تم إيقاف الصوت!", 2000);
}

// دالة عرض المحتوى ديناميكيًا
function displayContent(sectionId) {
    const container = document.getElementById(`${sectionId}Content`);
    if (!container || !contentData[sectionId]) return;
    container.innerHTML = contentData[sectionId].map(item => `
        <div class="item-container">
            <p class="magic-text">${item}</p>
            <div class="item-actions">
                <button onclick="copyText(this.parentElement.previousElementSibling)"><i class="fas fa-copy"></i></button>
                <button onclick="shareText(this.parentElement.previousElementSibling)"><i class="fas fa-share"></i></button>
                <button onclick="whatsappShare(this.parentElement.previousElementSibling)"><i class="fab fa-whatsapp"></i></button>
                <button onclick="addToFavorites(this.parentElement.previousElementSibling)"><i class="fas fa-heart"></i></button>
            </div>
        </div>
    `).join('');
}

// دالة عرض الأقسام
function showSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (!section) return;
    document.querySelectorAll('.content').forEach(sec => sec.classList.remove('active'));
    section.classList.add('active');
    displayContent(sectionId); // عرض المحتوى ديناميكيًا
    if (sectionId === 'favorite') displayFavorites();
    if (sectionId === 'custom-cards') updateCardPreview();
    const sidebar = document.getElementById('sidebar');
    if (sidebar) sidebar.classList.remove('active');
}

// دالة تبديل الوضع الليلي
const themeToggle = document.getElementById("themeToggle");
if (themeToggle) {
    themeToggle.addEventListener("click", () => {
        document.body.classList.toggle("dark-mode");
        const isDarkMode = document.body.classList.contains("dark-mode");
        themeToggle.innerHTML = isDarkMode ? '<i class="fas fa-sun"></i> تبديل الوضع الليلي' : '<i class="fas fa-moon"></i> تبديل الوضع الليلي';
        localStorage.setItem('darkMode', isDarkMode);
    });
}

// دالة البحث (محسنة للبحث في النصوص الفعلية فقط)
function searchContent() {
    const searchTerm = document.getElementById('searchInput').value.trim().toLowerCase();
    if (!searchTerm) return showNotification("يرجى إدخال كلمة للبحث!", 3000);

    const allSections = document.querySelectorAll('.content');
    let found = false;

    allSections.forEach(section => {
        section.classList.remove('active');
    });

    Object.keys(contentData).forEach(sectionId => {
        const section = document.getElementById(sectionId);
        if (section && contentData[sectionId].some(text => text.toLowerCase().includes(searchTerm))) {
            section.classList.add('active');
            displayContent(sectionId);
            found = true;
        }
    });

    if (!found) showNotification("لم يتم العثور على نتائج!", 3000);
    playClickSound();
}

// دالة تبديل العرض
const toggleView = document.getElementById('toggleView');
if (toggleView) {
    toggleView.addEventListener('click', () => {
        isGridView = !isGridView;
        const categoriesList = document.getElementById('categoriesList');
        categoriesList.classList.toggle('grid-view', isGridView);
        categoriesList.classList.toggle('list-view', !isGridView);
        localStorage.setItem('viewMode', isGridView ? 'grid' : 'list');
        playClickSound();
    });
}

// دالة الزخرفة
function decorateText() {
    const input = document.getElementById('decorationInput').value;
    const output = document.getElementById('decoratedOutput');
    if (!input) return showNotification("يرجى إدخال نص للزخرفة!", 3000);
    const decorated = input.split('').join('✨') + '✨';
    output.textContent = decorated;
    showNotification("تمت الزخرفة بنجاح!", 3000);
    playClickSound();
}

// دالة عرض الإشعارات
function showNotification(message, duration = 3000) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.innerHTML = message; // لدعم النصوص متعددة الأسطر
    document.body.appendChild(notification);
    notification.style.display = 'block';
    setTimeout(() => notification.remove(), duration);
}

// تحميل الصفحة وربط الصوت
window.onload = function() {
    initializeAudio();
    const savedMode = localStorage.getItem('darkMode');
    if (savedMode === 'true') {
        document.body.classList.add('dark-mode');
        themeToggle.innerHTML = '<i class="fas fa-sun"></i> تبديل الوضع الليلي';
    } else {
        themeToggle.innerHTML = '<i class="fas fa-moon"></i> تبديل الوضع الليلي';
    }
    const savedTheme = localStorage.getItem('theme') || 'default';
    changeTheme(savedTheme);
    const savedFontSize = localStorage.getItem('fontSize') || 'medium';
    changeFontSize(savedFontSize);
    const categoriesList = document.getElementById('categoriesList');
    if (isGridView) {
        categoriesList.classList.add('grid-view');
        categoriesList.classList.remove('list-view');
    } else {
        categoriesList.classList.add('list-view');
        categoriesList.classList.remove('grid-view');
    }
    showSection('home');

    const audioToggle = document.getElementById('audioToggle');
    audioToggle.innerHTML = audioEnabled 
        ? '<i class="fas fa-volume-up"></i> تشغيل الصوت' 
        : '<i class="fas fa-volume-mute"></i> إيقاف الصوت';

    const buttons = document.querySelectorAll('button');
    buttons.forEach(button => {
        button.addEventListener('click', playClickSound);
    });

    updateFontSizeButtons(savedFontSize);
    const cardText = document.getElementById('cardText');
    cardText.addEventListener('input', updateCardPreview);
};

// التحكم في القائمة الجانبية
const hamburger = document.getElementById("hamburger");
const sidebar = document.getElementById("sidebar");
if (hamburger && sidebar) {
    hamburger.addEventListener("click", () => {
        sidebar.classList.add('active');
        playClickSound();
    });
}

function closeSidebar() {
    if (sidebar) sidebar.classList.remove('active');
}

document.addEventListener('click', (event) => {
    if (sidebar && !sidebar.contains(event.target) && event.target !== hamburger) {
        sidebar.classList.remove('active');
    }
});

if (hamburger) {
    hamburger.addEventListener('click', (event) => event.stopPropagation());
}

// دوال الإعدادات والميزات
function copyText(element) {
    navigator.clipboard.writeText(element.textContent);
    showNotification("تم النسخ إلى الحافظة!", 3000);
}

function shareText(element) {
    if (navigator.share) {
        navigator.share({ text: element.textContent });
    } else {
        showNotification("المشاركة غير مدعومة، انسخ النص يدويًا!", 3000);
    }
}

function whatsappShare(element) {
    window.open(`https://wa.me/?text=${encodeURIComponent(element.textContent)}`, '_blank');
}

function addToFavorites(element) {
    if (!favorites.includes(element.textContent)) {
        favorites.push(element.textContent);
        localStorage.setItem('favorites', JSON.stringify(favorites));
        showNotification("تمت الإضافة إلى المفضلة!", 3000);
        displayFavorites();
    } else {
        showNotification("النص موجود بالفعل في المفضلة!", 3000);
    }
}

function removeFromFavorites(element) {
    const textElement = element.parentElement.previousElementSibling;
    const text = textElement.textContent;
    favorites = favorites.filter(item => item !== text);
    localStorage.setItem('favorites', JSON.stringify(favorites));
    showNotification("تم الحذف من المفضلة!", 3000);
    displayFavorites();
}

function displayFavorites() {
    const favoritesList = document.getElementById('favoritesList');
    favoritesList.innerHTML = favorites.length ? favorites.map(item => `
        <div class="item-container">
            <p class="magic-text">${item}</p>
            <div class="item-actions">
                <button onclick="copyText(this.parentElement.previousElementSibling)"><i class="fas fa-copy"></i></button>
                <button onclick="shareText(this.parentElement.previousElementSibling)"><i class="fas fa-share"></i></button>
                <button onclick="whatsappShare(this.parentElement.previousElementSibling)"><i class="fab fa-whatsapp"></i></button>
                <button onclick="removeFromFavorites(this)"><i class="fas fa-trash"></i></button>
            </div>
        </div>
    `).join('') : '<p class="magic-text">لا توجد عناصر في المفضلة بعد!</p>';
}

function contactUs() {
    window.open('https://Basitapp.blogspot.com', '_blank');
}

function rateApp() {
    showNotification("شكرًا لتقييمك! يرجى تقييم التطبيق في المتجر.", 3000);
}

function shareApp() {
    if (navigator.share) {
        navigator.share({
            title: 'عبر وخواطر',
            text: 'جرب تطبيق عبر وخواطر المميز!',
            url: window.location.href
        });
    } else {
        showNotification("شارك الرابط: " + window.location.href, 3000);
    }
}

function notifications() {
    if ("Notification" in window) {
        if (Notification.permission === "granted") {
            new Notification("تذكير يومي", { body: "الصبر مفتاح الفرج." });
        } else if (Notification.permission !== "denied") {
            Notification.requestPermission().then(permission => {
                if (permission === "granted") {
                    new Notification("تم تفعيل الإشعارات!", { body: "ستتلقى تذكيرات يومية." });
                }
            });
        } else {
            showNotification("تم رفض الإشعارات، تفعيلها من إعدادات المتصفح.", 3000);
        }
    } else {
        showNotification("المتصفح لا يدعم الإشعارات!", 3000);
    }
}

function checkUpdate() {
    showNotification("التطبيق محدث إلى الإصدار 1.0.0!", 3000);
}

function changeTheme(theme) {
    document.body.classList.remove('theme-green', 'theme-purple', 'theme-gray');
    if (theme !== 'default') document.body.classList.add(`theme-${theme}`);
    localStorage.setItem('theme', theme);
}

function changeFontSize(size) {
    const texts = document.querySelectorAll('.magic-text');
    texts.forEach(text => {
        if (size === 'small') text.style.fontSize = '16px';
        else if (size === 'medium') text.style.fontSize = '22px';
        else if (size === 'large') text.style.fontSize = '28px';
    });
    localStorage.setItem('fontSize', size);
    showNotification(`تم تغيير حجم الخط إلى: ${size === 'small' ? 'صغير' : size === 'medium' ? 'متوسط' : 'كبير'}`, 2000);
    updateFontSizeButtons(size);
}

function updateFontSizeButtons(activeSize) {
    const buttons = document.querySelectorAll('.font-size-btn');
    buttons.forEach(button => {
        button.classList.remove('active');
        if (button.getAttribute('onclick').includes(`'${activeSize}'`)) {
            button.classList.add('active');
        }
    });
}

// دوال إنشاء البطاقات المخصصة
function updateCardPreview() {
    const cardText = document.getElementById('cardText').value;
    const previewText = document.getElementById('cardPreviewText');
    previewText.textContent = cardText || "معاينة النص هنا";
}

function changeCardBackground(bg) {
    const preview = document.getElementById('cardPreview');
    preview.style.background = bg;
    playClickSound();
}

function changeCardFont(font) {
    const previewText = document.getElementById('cardPreviewText');
    previewText.style.fontFamily = font;
    playClickSound();
}

function changeCardColor(color) {
    const previewText = document.getElementById('cardPreviewText');
    previewText.style.color = color;
    playClickSound();
}

function saveCard() {
    const preview = document.getElementById('cardPreview');
    html2canvas(preview).then(canvas => {
        const link = document.createElement('a');
        link.download = 'custom_card.png';
        link.href = canvas.toDataURL('image/png');
        link.click();
        showNotification("تم حفظ البطاقة بنجاح!", 3000);
    }).catch(error => {
        console.error("خطأ في حفظ البطاقة:", error);
        showNotification("فشل حفظ البطاقة!", 3000);
    });
    playClickSound();
}

function shareCard() {
    const preview = document.getElementById('cardPreview');
    html2canvas(preview).then(canvas => {
        canvas.toBlob(blob => {
            const file = new File([blob], 'custom_card.png', { type: 'image/png' });
            if (navigator.share) {
                navigator.share({
                    files: [file],
                    title: 'بطاقة مخصصة من عبر وخواطر',
                    text: 'بطاقة تم إنشاؤها باستخدام تطبيق عبر وخواطر'
                }).then(() => showNotification("تمت المشاركة بنجاح!", 3000))
                  .catch(() => showNotification("فشلت المشاركة!", 3000));
            } else {
                showNotification("المشاركة غير مدعومة، احفظ الصورة وشاركها يدويًا!", 3000);
            }
        });
    }).catch(error => {
        console.error("خطأ في مشاركة البطاقة:", error);
        showNotification("فشل مشاركة البطاقة!", 3000);
    });
    playClickSound();
}