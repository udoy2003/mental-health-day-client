
import {
  BookOpen,
  Brain,
  Moon,
  HeartHandshake,
  Users,
  AlertCircle,
} from "lucide-react";

export const topics = [
  {
    slug: "stress-academic-pressure",
    title: "Stress & Academic Pressure",
    summary: "Understand study-related stress, its effects, and practical ways to manage academic pressure.",
    icon: BookOpen,
    introduction: "Academic stress is the mental and physical response a student may experience when study demands feel greater than the resources or time available. Exams, assignments, expectations, competition, financial concerns, and uncertainty about the future can all contribute. A certain level of stress can sometimes motivate preparation, but persistent or overwhelming stress can affect wellbeing.",
    why: [
      "Heavy workloads, multiple deadlines, or difficult subjects.",
      "Fear of failure, comparison with others, or pressure to achieve high grades.",
      "Family expectations or worries about future employment.",
      "Poor time management, lack of rest, or limited support.",
      "Financial, family, health, or relationship difficulties alongside studies."
    ],
    signs: [
      "Feeling overwhelmed, tense, irritable, or worried about academic performance.",
      "Difficulty concentrating, remembering information, or making decisions.",
      "Procrastinating because a task feels too difficult to begin.",
      "Changes in sleep, appetite, energy, or motivation.",
      "Avoiding classes, assignments, friends, or activities.",
      "Physical tension, headaches, or stomach discomfort during stressful periods."
    ],
    steps: [
      {
        title: "Break work into smaller tasks",
        detail: "Instead of writing “study everything”, choose one chapter, one topic, or one practice set. Small tasks make it easier to begin."
      },
      {
        title: "Make a realistic study plan",
        detail: "List deadlines and choose a few priorities for each day. Leave some time for unexpected tasks and revision."
      },
      {
        title: "Use focused study periods",
        detail: "Study for a manageable period, take a short break, and return when ready. Choose a method that suits your attention and workload."
      },
      {
        title: "Protect rest and basic routines",
        detail: "Try to maintain regular sleep, meals, movement, and time away from study. Rest is part of learning, not a reward you must earn."
      },
      {
        title: "Talk about the pressure",
        detail: "A trusted friend, teacher, family member, or student support service may help you think through practical options."
      }
    ],
    professional: [
      "Stress continues for weeks or feels increasingly difficult to manage.",
      "Study pressure is seriously affecting sleep, health, relationships, or everyday functioning.",
      "You feel persistently hopeless, panicked, or unable to cope.",
      "You want help identifying patterns and building healthier coping strategies."
    ],
    reminder: "Your grades do not define your worth. Asking for support does not mean you are weak or incapable."
  },
  {
    slug: "anxiety",
    title: "Anxiety",
    summary: "Learn how worry and fear can affect thoughts, the body, and everyday activities.",
    icon: Brain,
    introduction: "Anxiety is a common human response to uncertainty, pressure, or a perceived threat. It may prepare us to respond to a challenge. However, anxiety may need attention when fear or worry becomes intense, difficult to control, lasts over time, or interferes with everyday life. Anxiety symptoms alone do not establish a diagnosis.",
    why: [
      "Uncertainty about exams, work, relationships, health, or the future.",
      "Stressful or frightening experiences and major life changes.",
      "A combination of biological, psychological, and social factors.",
      "Ongoing physical health problems or lack of sleep may also influence how anxiety feels.",
      "Different people can experience anxiety for different reasons; there is not always one clear cause."
    ],
    signs: [
      "Repeated worry that feels difficult to stop.",
      "Feeling restless, tense, irritable, or constantly on alert.",
      "Difficulty concentrating or making decisions.",
      "A racing heart, sweating, trembling, nausea, or muscle tension.",
      "Trouble falling asleep or staying asleep.",
      "Avoiding situations because they bring strong fear or discomfort."
    ],
    steps: [
      {
        title: "Name what is happening",
        detail: "Try saying to yourself, “I am noticing worry right now.” Naming an experience can help you pause before reacting to it."
      },
      {
        title: "Try gentle grounding",
        detail: "Notice your feet on the floor, identify things you can see and hear, and bring attention back to the present. Stop if an exercise makes you feel worse."
      },
      {
        title: "Use comfortable, slow breathing",
        detail: "Breathe gently without forcing deep breaths. The aim is comfort, not achieving a perfect breathing pattern."
      },
      {
        title: "Take one manageable step",
        detail: "If a task feels frightening, identify a small safe step you can take rather than trying to solve everything at once."
      },
      {
        title: "Support your daily routine",
        detail: "Regular sleep, meals, physical activity, and connection with trusted people can support general wellbeing."
      }
    ],
    professional: [
      "Worry or fear is persistent, intense, or difficult to control.",
      "You frequently avoid study, work, social situations, or other activities because of anxiety.",
      "Physical symptoms or panic-like experiences are causing significant distress.",
      "Anxiety is affecting your sleep, relationships, or daily responsibilities."
    ],
    reminder: "Feeling anxious does not mean you are failing. A qualified professional can help assess what is happening and discuss appropriate support."
  },
  {
    slug: "depression-low-mood",
    title: "Depression & Low Mood",
    summary: "Understand the difference between ordinary sadness and persistent changes in mood or interest.",
    icon: HeartHandshake,
    introduction: "Sadness and low mood are part of human life. Depression is different from ordinary mood changes: it involves a persistent depressed mood or loss of interest or pleasure, often alongside changes in energy, sleep, appetite, concentration, or self-worth. It can affect study, work, relationships, and daily activities. Only a qualified professional can assess and diagnose depression.",
    why: [
      "Depression can involve a complex interaction of biological, psychological, and social factors.",
      "Severe stress, loss, difficult life events, or ongoing adversity may contribute.",
      "Physical health conditions and other mental health difficulties can also affect mood.",
      "Sometimes a person cannot identify one clear reason for feeling depressed.",
      "Depression is not a character flaw and is not simply a lack of willpower."
    ],
    signs: [
      "Feeling sad, empty, hopeless, or unusually irritable for much of the time.",
      "Losing interest or pleasure in activities that previously mattered.",
      "Feeling exhausted or having much less energy.",
      "Changes in sleep, appetite, or weight.",
      "Difficulty concentrating, remembering, or making decisions.",
      "Feeling excessive guilt, worthlessness, or hopelessness.",
      "Withdrawing from people or finding ordinary tasks unusually difficult."
    ],
    steps: [
      {
        title: "Tell someone you trust",
        detail: "You do not need to explain everything perfectly. You could begin with, “I have not been feeling like myself, and I need someone to listen.”"
      },
      {
        title: "Choose very small daily activities",
        detail: "A shower, a simple meal, a short walk, or opening a study book for five minutes may be a manageable starting point."
      },
      {
        title: "Keep some connection",
        detail: "If possible, maintain contact with a trusted person even when you do not feel like socializing."
      },
      {
        title: "Avoid self-blame",
        detail: "Difficulty completing tasks during low mood is not proof of laziness. Try to respond to yourself with patience."
      },
      {
        title: "Seek an assessment when needed",
        detail: "A qualified mental health professional can explore symptoms, possible causes, and suitable treatment options."
      }
    ],
    professional: [
      "Low mood or loss of interest continues for around two weeks or longer.",
      "Your sleep, eating, study, work, relationships, or self-care are being affected.",
      "You feel hopeless, worthless, or increasingly isolated.",
      "You have thoughts of death or self-harm. Seek urgent support rather than facing this alone."
    ],
    reminder: "Depression is treatable. If you may act on thoughts of harming yourself or cannot stay safe, contact local emergency services or go to the nearest emergency department now. Tell a trusted person and ask them to stay with you if it is safe."
  },
  {
    slug: "sleep-mental-wellbeing",
    title: "Sleep & Mental Wellbeing",
    summary: "Explore the connection between sleep, emotions, concentration, and daily wellbeing.",
    icon: Moon,
    introduction: "Sleep is an important part of physical and mental wellbeing. Sleep and emotional health can influence each other: stress or low mood may make sleep difficult, while ongoing sleep problems can make it harder to manage emotions, attention, and daily demands. Occasional poor sleep is common; persistent problems deserve attention.",
    why: [
      "Irregular sleep and wake times or changing daily routines.",
      "Academic pressure, worry, or stressful life events.",
      "Late-night screen use, stimulating activities, or an uncomfortable sleep environment.",
      "Caffeine or other substances can affect sleep for some people.",
      "Physical health conditions, medication, and sleep disorders may also play a role."
    ],
    signs: [
      "Taking a long time to fall asleep or waking repeatedly.",
      "Waking earlier than intended and finding it hard to return to sleep.",
      "Feeling tired, unrefreshed, or sleepy during the day.",
      "Difficulty concentrating, remembering, or regulating emotions.",
      "Worrying about sleep so much that bedtime itself becomes stressful.",
      "Sleep difficulties interfering with study, work, or relationships."
    ],
    steps: [
      {
        title: "Keep a consistent schedule",
        detail: "Try to wake up at a similar time each day. Adjust routines gradually rather than making sudden changes."
      },
      {
        title: "Create a wind-down routine",
        detail: "Choose calm activities before bed, such as reading, gentle stretching, or quiet music."
      },
      {
        title: "Make the sleep space comfortable",
        detail: "Where possible, keep the room quiet, dark, and comfortable. Reduce interruptions that you can control."
      },
      {
        title: "Notice caffeine and daytime habits",
        detail: "Observe whether tea, coffee, energy drinks, naps, or activity close to bedtime affect your sleep."
      },
      {
        title: "Reduce pressure to force sleep",
        detail: "If you are awake, try a quiet relaxing activity until you feel sleepy. Avoid repeatedly checking the time."
      }
    ],
    professional: [
      "Sleep difficulties continue and affect your daily functioning.",
      "You regularly feel very sleepy during the day despite allowing time for sleep.",
      "You experience loud snoring, breathing pauses, unusual movements, or other concerning sleep symptoms.",
      "Sleep problems occur alongside persistent anxiety, low mood, or another health concern."
    ],
    reminder: "There is no single sleep routine that works for everyone. Persistent sleep problems may have different causes, so professional advice can be useful."
  },
  {
    slug: "relationships-emotional-wellbeing",
    title: "Relationships & Emotional Wellbeing",
    summary: "Learn about communication, emotional needs, healthy boundaries, and supportive relationships.",
    icon: Users,
    introduction: "Relationships with friends, family, classmates, partners, and colleagues can influence emotional wellbeing. Supportive relationships may help people feel connected and understood. Conflict, rejection, isolation, or unsafe behaviour can cause distress. Healthy relationships do not require people to agree all the time; they involve respect, communication, and safety.",
    why: [
      "Misunderstandings, unmet expectations, or difficulty expressing needs.",
      "Differences in values, responsibilities, communication styles, or boundaries.",
      "Stress from study, work, family, or financial concerns affecting relationships.",
      "Feeling isolated or lacking people with whom you can speak openly.",
      "Controlling, threatening, humiliating, or violent behaviour can make a relationship unsafe."
    ],
    signs: [
      "Repeated arguments that are difficult to resolve.",
      "Feeling unheard, dismissed, pressured, or emotionally exhausted.",
      "Finding it difficult to say no or express personal needs.",
      "Withdrawing from friends or people who usually support you.",
      "Feeling afraid of another person's reaction or being controlled.",
      "Relationship difficulties affecting sleep, study, work, or self-esteem."
    ],
    steps: [
      {
        title: "Identify your feelings and needs",
        detail: "Before a difficult conversation, consider what happened, how you felt, and what change or support you are asking for."
      },
      {
        title: "Choose a suitable time to talk",
        detail: "If it is safe, discuss concerns when both people have time and are relatively calm."
      },
      {
        title: "Use clear and respectful language",
        detail: "Describe a specific situation and its effect on you. Try to avoid insults, threats, or assumptions about the other person's intentions."
      },
      {
        title: "Set and respect boundaries",
        detail: "A boundary explains what you are comfortable with and what you will do if it is not respected. Other people's boundaries matter too."
      },
      {
        title: "Build support beyond one relationship",
        detail: "Stay connected with trusted friends, family, mentors, or support services rather than carrying every difficulty alone."
      }
    ],
    professional: [
      "Relationship conflict is repeatedly affecting your mental wellbeing.",
      "You feel isolated, controlled, threatened, or unable to express yourself safely.",
      "You are struggling with grief, separation, trust, or ongoing interpersonal distress.",
      "You want help understanding communication patterns or making decisions."
    ],
    reminder: "You deserve to be treated with respect. If you are in immediate danger or experiencing violence, prioritize safety and contact local emergency services or a trusted support organization."
  },
  {
    slug: "when-to-seek-help",
    title: "When to Seek Help",
    summary: "Recognize when talking to a trusted person or mental health professional may be useful.",
    icon: AlertCircle,
    introduction: "You do not have to wait until a problem becomes unbearable before asking for help. Support may be useful when emotional distress persists, becomes more intense, affects daily life, or feels difficult to manage alone. Seeking help is a practical step toward understanding your situation; it does not mean you have failed.",
    why: [
      "A concern may become harder to manage when someone faces it without support.",
      "Changes in mood, sleep, energy, concentration, or behaviour can have many possible causes.",
      "A professional can help explore symptoms, circumstances, strengths, and available options.",
      "Early conversations may help identify support before difficulties become more disruptive.",
      "Different people need different kinds of support; there is no one-size-fits-all path."
    ],
    signs: [
      "Distress continues, returns frequently, or feels increasingly intense.",
      "You find it difficult to manage study, work, relationships, or daily activities.",
      "You withdraw from others or lose interest in things that matter to you.",
      "Sleep, appetite, energy, or concentration changes significantly.",
      "You feel hopeless, unsafe, or unable to cope.",
      "You are worried about your own safety or someone else's safety."
    ],
    steps: [
      {
        title: "Start with someone you trust",
        detail: "You might say, “I have been having a difficult time. Could you listen and help me think about what to do next?”"
      },
      {
        title: "Describe what has changed",
        detail: "It can help to note when the concern began, how often it happens, and how it affects everyday life."
      },
      {
        title: "Consider professional support",
        detail: "A qualified mental health professional can discuss your concerns, explain options, and help decide what support may fit your needs."
      },
      {
        title: "Ask questions about the service",
        detail: "You can ask about qualifications, confidentiality and its limits, fees, appointment options, and what to expect."
      },
      {
        title: "Take urgent concerns seriously",
        detail: "If there is immediate danger, seek emergency help. Do not rely on a website or routine appointment for an emergency."
      }
    ],
    professional: [
      "Your distress is persistent, worsening, or affecting everyday life.",
      "You are unsure what is happening and want a professional assessment.",
      "You have tried to manage alone but need more support.",
      "You have thoughts of harming yourself or someone else, or cannot stay safe."
    ],
    reminder: "If you or someone else is in immediate danger, contact local emergency services or go to the nearest emergency department. If possible, tell a trusted person and do not remain alone while urgent help is being arranged."
  }
];
