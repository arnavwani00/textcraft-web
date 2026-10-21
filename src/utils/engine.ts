import { 
  Situation, 
  SituationId, 
  Vibe, 
  VibeId, 
  ReplyLength, 
  GeneratedReply, 
  GenerateRequestPayload 
} from '../types/index.ts';

export const SITUATIONS: Situation[] = [
  {
    id: 'flirting',
    name: 'Flirting',
    tagline: 'Because "haha" isn\'t always enough.',
    description: 'For crushes, dating apps, late night DMs, and asking someone out.',
    iconName: 'Flame',
    badge: 'Dating & Vibes',
    placeholderText: 'e.g., "You looked really good last night btw" or "wyd tonight?"',
    defaultContext: 'I like them but don\'t want to seem too eager.',
    exampleIncoming: 'You looked really good last night btw',
  },
  {
    id: 'argument',
    name: 'Argument',
    tagline: 'Say what you mean without making it worse.',
    description: 'For conflict, misunderstandings, heated threads, and setting boundaries.',
    iconName: 'ShieldAlert',
    badge: 'De-escalate & Boundaries',
    placeholderText: 'e.g., "Why are you acting like this? You never listen to me."',
    defaultContext: 'I\'m frustrated but I don\'t want to start another explosive fight.',
    exampleIncoming: 'Why do you always turn things back on me?',
  },
  {
    id: 'professional',
    name: 'Professional',
    tagline: 'For when generic responses aren\'t an option.',
    description: 'For managers, professors, clients, networking, and polite workplace pushback.',
    iconName: 'Briefcase',
    badge: 'Workplace & Formal',
    placeholderText: 'e.g., "Can you take a look at this over the weekend? Need it first thing Monday."',
    defaultContext: 'This is my manager and I need to establish boundary without looking unhelpful.',
    exampleIncoming: 'Can you finish this report over the weekend? Urgent.',
  },
  {
    id: 'dry-texter',
    name: 'Dry Texter',
    tagline: 'For conversations dying in real time.',
    description: 'For one-word replies, dead momentum, "K", "Haha", "Cool", and "Yeah".',
    iconName: 'ZapOff',
    badge: 'CPR for Dead Chats',
    placeholderText: 'e.g., "k" or "lol yeah" or "cool"',
    defaultContext: 'I want to see if they actually care to chat, or just kill the dead chat cleanly.',
    exampleIncoming: 'k haha',
  },
  {
    id: 'apology',
    name: 'Apology',
    tagline: 'Say sorry without writing a whole essay.',
    description: 'For repairing relationships, taking ownership, and genuine accountability.',
    iconName: 'HeartHandshake',
    badge: 'Make Things Right',
    placeholderText: 'e.g., "I waited 45 minutes for you. You could have at least texted."',
    defaultContext: 'I messed up and lost track of time. I want to apologize without sounding defensive.',
    exampleIncoming: 'I waited almost an hour. You could have at least let me know.',
  },
  {
    id: 'friendship-drama',
    name: 'Friendship Drama',
    tagline: 'For conversations you\'d rather avoid.',
    description: 'For feeling left out, subtle shade, awkward cancellations, and group chat tension.',
    iconName: 'Users',
    badge: 'Friend Group Politics',
    placeholderText: 'e.g., "We saw you hung out without us yesterday..."',
    defaultContext: 'They are making an issue out of nothing, but I want to keep peace.',
    exampleIncoming: 'Saw you guys hung out yesterday. Guess the invite got lost.',
  },
];

export const VIBES: Vibe[] = [
  {
    id: 'casual',
    name: 'Casual',
    tagline: 'Natural, relaxed, conversational',
    description: 'Keeps it breezy and low-pressure. Reads like you typed it in 3 seconds.',
    emoji: '🤙',
    colorClass: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
  },
  {
    id: 'funny',
    name: 'Funny',
    tagline: 'Playful, witty, slightly humorous',
    description: 'Breaks tension with sharp humor, relatable banter, or dry sarcasm.',
    emoji: '✨',
    colorClass: 'bg-amber-500/10 text-amber-400 border-amber-500/30',
  },
  {
    id: 'cold',
    name: 'Cold',
    tagline: 'Short, detached, emotionally distant',
    description: 'Unbothered energy. Zero emotional investment. Gives them nothing to latch onto.',
    emoji: '🧊',
    colorClass: 'bg-sky-500/10 text-sky-400 border-sky-500/30',
  },
  {
    id: 'flirty',
    name: 'Flirty',
    tagline: 'Confident, charming, and playful',
    description: 'Teasing tone, high confidence, leaves just enough room for them to chase.',
    emoji: '🔥',
    colorClass: 'bg-rose-500/10 text-rose-400 border-rose-500/30',
  },
  {
    id: 'direct',
    name: 'Direct',
    tagline: 'Clear, honest, and straightforward',
    description: 'No games, no fluff. Says the exact truth with calm conviction.',
    emoji: '🎯',
    colorClass: 'bg-purple-500/10 text-purple-400 border-purple-500/30',
  },
  {
    id: 'polite',
    name: 'Polite',
    tagline: 'Respectful, friendly, and diplomatic',
    description: 'Graceful and tactful. De-escalates friction and protects goodwill.',
    emoji: '🤝',
    colorClass: 'bg-blue-500/10 text-blue-400 border-blue-500/30',
  },
  {
    id: 'savage',
    name: 'Savage',
    tagline: 'Biting, lethal comeback, unbothered',
    description: 'For when someone crossed a line and needs a reality check.',
    emoji: '💀',
    colorClass: 'bg-red-500/10 text-red-400 border-red-500/30',
  },
  {
    id: 'dry',
    name: 'Dry',
    tagline: 'Deadpan, minimalist, ironic',
    description: 'Monotone delivery that lets silence do the heavy lifting.',
    emoji: '🗿',
    colorClass: 'bg-stone-500/10 text-stone-300 border-stone-500/30',
  },
];

// Interactive Live Demo Pre-configured Responses
export const DEMO_PRESETS: Record<string, { incoming: string; replies: Record<VibeId, { reply: string; explanation: string }> }> = {
  disappeared: {
    incoming: "You disappeared for three days and now you're texting me?",
    replies: {
      casual: {
        reply: "Haha my bad, life got chaotic this week! What did I miss?",
        explanation: "Keeps things light without getting defensive or making dramatic excuses."
      },
      funny: {
        reply: "I was actually in witness protection, but I missed the drama so I broke protocol.",
        explanation: "Defuses the awkward silence with playful absurdity instead of a stiff apology."
      },
      cold: {
        reply: "I was busy. What's up?",
        explanation: "Sets firm detachment and shifts the conversation directly to utility."
      },
      flirty: {
        reply: "Were you counting the hours? Honestly that's kind of cute.",
        explanation: "Flips the accusation into flirty banter by framing their complaint as longing."
      },
      direct: {
        reply: "Yeah, I needed space to unplug. I'm around now if you still wanted to catch up.",
        explanation: "Calmly acknowledges the reality without over-apologizing."
      },
      polite: {
        reply: "I'm really sorry for the silence—work completely caught up with me. How are things with you?",
        explanation: "Respectful and considerate; validates their point without oversharing."
      },
      savage: {
        reply: "Didn't realize we had a daily attendance requirement.",
        explanation: "Shuts down guilt-tripping with unapologetic bite."
      },
      dry: {
        reply: "Time isn't real anyway.",
        explanation: "Deadpan dismissal of conversational guilt."
      }
    }
  },
  comingOrNot: {
    incoming: "So are you actually coming or not?",
    replies: {
      casual: {
        reply: "Yeah, I'll be there around 9!",
        explanation: "Friendly and quick with concrete expectation."
      },
      funny: {
        reply: "Depends. Is there food, or am I expected to survive on small talk?",
        explanation: "Playful boundary framed as a craving."
      },
      cold: {
        reply: "Probably not.",
        explanation: "Zero ambiguity, completely unbothered."
      },
      flirty: {
        reply: "Only if you save a spot next to you.",
        explanation: "Turns an ordinary RSVP into personal tension."
      },
      direct: {
        reply: "Can't make it tonight, got an early morning. Have fun though!",
        explanation: "Clean and polite refusal with zero hesitation."
      },
      polite: {
        reply: "Unfortunately I won't be able to join this time, but thank you for checking in on me!",
        explanation: "Gracious decline that protects the social relationship."
      },
      savage: {
        reply: "You'll find out when the door opens.",
        explanation: "Keeps power and leaves them wondering."
      },
      dry: {
        reply: "No.",
        explanation: "The ultimate minimalist boundary."
      }
    }
  }
};

/**
 * Categorize incoming message to suggest the right situation category
 */
export function categorizeIncomingMessage(text: string): SituationId {
  const lower = text.toLowerCase();
  
  if (/^(k|ok|cool|yeah|yep|haha|lol|nice|mhm|sure)$/i.test(text.trim()) || text.trim().length <= 5) {
    return 'dry-texter';
  }
  if (/\b(sorry|apologize|apologies|my fault|mistake|forgive|messed up|regret)\b/.test(lower)) {
    return 'apology';
  }
  if (/\b(fight|argue|yell|angry|upset|accuse|annoying|blame|screaming|toxic|shut up)\b/.test(lower)) {
    return 'argument';
  }
  if (/\b(deadline|meeting|deck|client|agenda|asap|deliverable|pto|report|eod|sync|q[1-4]|budget|review|colleague|boss|manager|slack)\b/.test(lower)) {
    return 'professional';
  }
  if (/\b(invite|group|hung out|drama|behind my back|talk about me|exclude|left out)\b/.test(lower)) {
    return 'friendship-drama';
  }
  if (/\b(cute|hot|fine|attractive|pretty|kiss|crush|gorgeous|handsome|wyd|babe|love|dating|date|last night)\b/.test(lower)) {
    return 'flirting';
  }

  return 'flirting';
}

/**
 * Compute the Tone Meter state based on tone intensity (0 = soft, 100 = direct) and vibe
 */
export function calculateSoftDirectMeter(intensity: number): {
  label: string;
  badgeColor: string;
  intensityPercent: number;
} {
  const clamped = Math.max(0, Math.min(100, Math.round(intensity)));
  if (clamped < 25) {
    return { label: 'Gentle & Soft', badgeColor: 'text-emerald-400 bg-emerald-500/10', intensityPercent: clamped };
  }
  if (clamped < 50) {
    return { label: 'Balanced & Diplomatic', badgeColor: 'text-sky-400 bg-sky-500/10', intensityPercent: clamped };
  }
  if (clamped < 75) {
    return { label: 'Clear & Assertive', badgeColor: 'text-amber-400 bg-amber-500/10', intensityPercent: clamped };
  }
  return { label: 'Unfiltered Direct', badgeColor: 'text-rose-400 bg-rose-500/10', intensityPercent: clamped };
}

/**
 * Curated situation-specific response bank for offline / instant high-quality generation
 */
interface GenerationRuleInput {
  incoming: string;
  situation: SituationId;
  vibe: VibeId;
  intensity: number; // 0 (soft) to 100 (direct)
  length: ReplyLength;
  context?: string;
}

export function generateSmartReplies(input: GenerationRuleInput): GeneratedReply[] {
  const { incoming, situation, vibe, intensity, length, context } = input;
  const isSoft = intensity < 45;
  const isDirect = intensity > 65;
  const cleanInput = incoming.trim();
  const contextNote = context ? ` (Taking into account: "${context}")` : '';

  // Tailored responses based on Situation and Vibe
  const responses: { text: string; explanation: string; score: number }[] = [];

  switch (situation) {
    case 'flirting': {
      if (vibe === 'flirty') {
        responses.push(
          {
            text: isSoft 
              ? "You're always sweet like that. Made me smile today." 
              : "Careful now, you're making it way too obvious you're into me.",
            explanation: isSoft 
              ? "Warm and reciprocative without coming on too strong." 
              : "Bold playful challenge that leaves them wanting to prove themselves.",
            score: isSoft ? 30 : 85,
          },
          {
            text: length === 'short'
              ? "You noticed? I was hoping you would."
              : "Honestly was hoping you'd notice. Are you planning on doing anything about it or just texting?",
            explanation: "Flips the observation into an active invitation.",
            score: 75,
          },
          {
            text: "Takes one to know one. What are you up to later?",
            explanation: "Short ping-pong reply that immediately transitions to meeting up.",
            score: 60,
          },
          {
            text: "I'd tell you my secret, but then I'd have to see you again.",
            explanation: "Witty intrigue that plants the seed for the next hangout.",
            score: 70,
          }
        );
      } else if (vibe === 'funny') {
        responses.push(
          {
            text: "Finally, someone with good taste. It was getting lonely out here.",
            explanation: "Self-deprecating banter that prevents things from becoming excessively serious.",
            score: 65,
          },
          {
            text: "Took all of 3 panic outfits and 2 mental breakdowns, so I appreciate the validation.",
            explanation: "Relatable behind-the-scenes humor that humanizes you.",
            score: 40,
          },
          {
            text: "My ego didn't need this today, but thank you.",
            explanation: "Lighthearted and casual tease.",
            score: 55,
          }
        );
      } else if (vibe === 'cold') {
        responses.push(
          {
            text: "Thanks.",
            explanation: "Leaves them hanging without feeding unnecessary validation.",
            score: 90,
          },
          {
            text: "I know, appreciate it.",
            explanation: "Calm, detached, zero chase.",
            score: 80,
          },
          {
            text: "Thank you. Talk soon.",
            explanation: "Polite full-stop that halts continuous texting.",
            score: 85,
          }
        );
      } else {
        // Casual / Polite / Direct
        responses.push(
          {
            text: isDirect ? "Thank you! You looked great too." : "Aw thank you, that's really kind of you!",
            explanation: "Effortless and smooth acknowledgement.",
            score: isDirect ? 70 : 35,
          },
          {
            text: "Appreciate that! Had a really fun time seeing you.",
            explanation: "Positive reinforcement without being overwhelming.",
            score: 50,
          },
          {
            text: "Thanks! Hope you got home safe last night.",
            explanation: "Thoughtful follow-up that keeps the vibe warm.",
            score: 45,
          }
        );
      }
      break;
    }

    case 'argument': {
      if (vibe === 'direct') {
        responses.push(
          {
            text: isSoft 
              ? "I understand you're frustrated, but I need us to speak calmly before we continue."
              : "I don't agree with how you're framing this, and I'm not going to argue over text.",
            explanation: "Draws a firm line in the sand without escalating emotions.",
            score: isSoft ? 40 : 90,
          },
          {
            text: "Let's pause this. Texting when we're both irritated is only going to make this worse.",
            explanation: "Strategic circuit breaker that protects the relationship from rash words.",
            score: 75,
          },
          {
            text: "I hear what you're saying, but my boundaries on this aren't up for debate.",
            explanation: "Assertive ownership of personal boundaries.",
            score: 85,
          }
        );
      } else if (vibe === 'cold') {
        responses.push(
          {
            text: "We can talk when you're ready to have a normal conversation.",
            explanation: "Disarms aggressive energy by refusing to engage on their terms.",
            score: 85,
          },
          {
            text: "I've already said my piece. I'm not going in circles.",
            explanation: "Terminates repetitive venting cleanly.",
            score: 95,
          },
          {
            text: "Okay.",
            explanation: "Total emotional defuse. Denies the fuel needed for an argument.",
            score: 90,
          }
        );
      } else if (vibe === 'polite') {
        responses.push(
          {
            text: "I really value our connection and I hate that we're feeling this way. Can we talk on a quick call instead?",
            explanation: "Prioritizes the bond over winning the argument.",
            score: 25,
          },
          {
            text: "I hear where your frustration is coming from. Let's take an hour to cool off and talk properly.",
            explanation: "Diplomatic, empathetic, and prevents escalating spiral.",
            score: 35,
          },
          {
            text: "I apologize if my tone came across wrong earlier. That wasn't my intent at all.",
            explanation: "De-escalates immediately by addressing tone without conceding facts.",
            score: 20,
          }
        );
      } else {
        // Casual / Funny / Savage
        responses.push(
          {
            text: "Look, I really don't want to fight about this. Can we just reset?",
            explanation: "Honest casual peace offer.",
            score: 45,
          },
          {
            text: "Deep breath. We're on the same team here even if it doesn't feel like it right now.",
            explanation: "Reframes opponent into teammate.",
            score: 40,
          },
          {
            text: "I'm not matching this energy today.",
            explanation: "Savage boundary setting with zero apology.",
            score: 95,
          }
        );
      }
      break;
    }

    case 'professional': {
      if (vibe === 'polite') {
        responses.push(
          {
            text: "Thanks for checking in! I've logged this and will dive in first thing Monday morning so it gets my full attention.",
            explanation: "Maintains weekend boundaries while assuring professional reliability.",
            score: 35,
          },
          {
            text: "Thank you for the update. I appreciate you bringing this up, and I'll follow up shortly with next steps.",
            explanation: "Crisp and courteous corporate acknowledgement.",
            score: 30,
          },
          {
            text: "Understood. Happy to coordinate this with the team and circle back by end of day.",
            explanation: "Standard high-trust professional confirmation.",
            score: 40,
          }
        );
      } else if (vibe === 'direct') {
        responses.push(
          {
            text: "I won't be available over the weekend, but I'll prioritize this as my top item Monday at 9:00 AM.",
            explanation: "Clear, unequivocal availability boundary without guilt.",
            score: 80,
          },
          {
            text: "To hit that deadline, we'll need to de-prioritize the second deliverable. Let me know if that trade-off works.",
            explanation: "Frames work limits in terms of business trade-offs rather than refusal.",
            score: 75,
          },
          {
            text: "I've reviewed the request. Let's align quickly on Slack on Monday so I can execute accurately.",
            explanation: "Professional cadence protection.",
            score: 70,
          }
        );
      } else {
        // Casual / Formal
        responses.push(
          {
            text: "On it! Will send a draft over as soon as it's ready for review.",
            explanation: "Breezy and reliable team-player reply.",
            score: 45,
          },
          {
            text: "Received with thanks. I'll review and get back to you with notes.",
            explanation: "Standard no-nonsense office protocol.",
            score: 50,
          },
          {
            text: "Sounds good, keeping you in the loop on progress.",
            explanation: "Simple reassurance.",
            score: 40,
          }
        );
      }
      break;
    }

    case 'dry-texter': {
      if (vibe === 'funny') {
        responses.push(
          {
            text: "Don't write a whole novel now, save some words for your memoirs.",
            explanation: "Playfully calls out low effort without being passive aggressive.",
            score: 65,
          },
          {
            text: "Riveting commentary. I'm on the edge of my seat.",
            explanation: "Sarcastic jab that nudges them to actually engage.",
            score: 75,
          },
          {
            text: "Should I call an ambulance or is typing more than 2 letters fatal for you?",
            explanation: "Exaggerated tease that breaks the dry texting pattern.",
            score: 70,
          }
        );
      } else if (vibe === 'cold') {
        responses.push(
          {
            text: "👍",
            explanation: "Match their exact energy. Gives them nowhere to hide.",
            score: 90,
          },
          {
            text: "Cool.",
            explanation: "Mirrors dry text with zero follow-up question.",
            score: 85,
          },
          {
            text: "Later.",
            explanation: "Closes the dead thread effortlessly.",
            score: 90,
          }
        );
      } else if (vibe === 'flirty') {
        responses.push(
          {
            text: "Are you this quiet in person or do I have to come find out?",
            explanation: "Flips their dead text into a teasing opening for an in-person meet.",
            score: 80,
          },
          {
            text: "You're lucky you're cute, because your texting skills need urgent CPR.",
            explanation: "Charming compliment coupled with playful teasing.",
            score: 75,
          },
          {
            text: "I bet you thought that was very mysterious of you.",
            explanation: "Reinterprets aloofness as intentional flirtation.",
            score: 70,
          }
        );
      } else {
        // Casual / Direct
        responses.push(
          {
            text: "Anyway! Did you end up seeing that movie yesterday?",
            explanation: "Bypasses the dead one-liner and pivots to a substantive topic.",
            score: 30,
          },
          {
            text: "Well that was informative haha. Hit me up when you're free to chat properly!",
            explanation: "Politely lets the conversation rest until they are engaged.",
            score: 60,
          },
          {
            text: "Alright, let me let you go!",
            explanation: "Clean exit that preserves your dignity.",
            score: 70,
          }
        );
      }
      break;
    }

    case 'apology': {
      if (vibe === 'polite') {
        responses.push(
          {
            text: "I'm genuinely sorry for how that played out. You had every right to expect better from me, and I won't let it happen again.",
            explanation: "Takes complete accountability without deflecting or making hollow excuses.",
            score: 25,
          },
          {
            text: "I apologize sincerely. I completely lost track of time and that was disrespectful of yours. Can I make it up to you?",
            explanation: "Acknowledges the real impact (respect of their time) and offers restitution.",
            score: 30,
          },
          {
            text: "I'm really sorry. I value you a lot and I hate that I let you down today.",
            explanation: "Warm and vulnerable apology.",
            score: 20,
          }
        );
      } else if (vibe === 'direct') {
        responses.push(
          {
            text: "I messed up, full stop. No excuses. I'm sorry, and I'll make sure this doesn't repeat.",
            explanation: "Zero defensiveness, crisp and honest.",
            score: 85,
          },
          {
            text: "You're 100% right to be upset with me. I apologize.",
            explanation: "Validates their anger without debating the details.",
            score: 80,
          },
          {
            text: "I'm sorry. Tell me how I can best fix this for you right now.",
            explanation: "Action-oriented resolution.",
            score: 70,
          }
        );
      } else {
        // Casual
        responses.push(
          {
            text: "I'm so sorry! Totally on me. Next coffee is 100% on me.",
            explanation: "Casual and quick repair for low-stakes friend slip-ups.",
            score: 45,
          },
          {
            text: "Ugh I feel terrible about this. Really sorry about the delay!",
            explanation: "Genuine friendly regret.",
            score: 40,
          },
          {
            text: "So sorry! Running to you right now.",
            explanation: "Immediate action oriented apology.",
            score: 50,
          }
        );
      }
      break;
    }

    case 'friendship-drama': {
      if (vibe === 'direct') {
        responses.push(
          {
            text: isSoft
              ? "It really wasn't intended like that at all. You're my friend and I never want you feeling left out. Let's hang soon!"
              : "It was a spontaneous last-minute thing, not a secret plan. If you're feeling left out, let's talk about it directly.",
            explanation: "Addresses the insecurity without letting false narratives spiral.",
            score: isSoft ? 30 : 80,
          },
          {
            text: "I value our friendship too much for weird subtext. Are we good, or do we need to talk this through?",
            explanation: "Pushes for direct honesty over passive-aggressive tension.",
            score: 85,
          },
          {
            text: "I'm always down to hang out with you, but I also have other friend circles and that doesn't change how much I care about you.",
            explanation: "Healthy boundary setting regarding friendship autonomy.",
            score: 75,
          }
        );
      } else if (vibe === 'casual') {
        responses.push(
          {
            text: "Oh no it was literally a last second run-in! You definitely weren't left out on purpose. What are you doing this weekend?",
            explanation: "Normalizes the situation and immediately plans the next meetup.",
            score: 40,
          },
          {
            text: "Haha no conspiracy here! We just grabbed a quick bite. We need a proper group hangout soon though.",
            explanation: "Dismisses drama with light energy.",
            score: 35,
          },
          {
            text: "Missed you guys! Let's get everyone together this week.",
            explanation: "Warm inclusive pivot.",
            score: 30,
          }
        );
      } else {
        // Savage / Cold
        responses.push(
          {
            text: "Not every hangout is a personal slight against you.",
            explanation: "Blunt boundary against perpetual friendship victimhood.",
            score: 95,
          },
          {
            text: "It wasn't that deep.",
            explanation: "Three words that instantly deflate manufactured drama.",
            score: 90,
          },
          {
            text: "I'm not doing this passive-aggressive thing. If you want to hang out, just ask.",
            explanation: "Calls out the indirect complaint directly.",
            score: 85,
          }
        );
      }
      break;
    }
  }

  // Adjust for length if requested
  const adjusted = responses.map((r, i) => {
    let text = r.text;
    if (length === 'short' && text.length > 70) {
      // Split into first punchy sentence if possible
      const firstSentence = text.split(/[.?!]/)[0];
      if (firstSentence && firstSentence.length > 10) {
        text = firstSentence + '.';
      }
    } else if (length === 'detailed' && text.length < 90) {
      // Enhance slightly for detailed mode
      if (situation === 'professional') {
        text = `${text} Please feel free to reach out if you need anything clarified in the interim.`;
      } else if (situation === 'flirting') {
        text = `${text} Just saying.`;
      } else if (situation === 'apology') {
        text = `${text} I truly appreciate your patience with me on this.`;
      }
    }

    return {
      id: `reply-${situation}-${vibe}-${i + 1}-${Date.now() % 10000}`,
      situationId: situation,
      vibeId: vibe,
      text,
      explanation: r.explanation + (contextNote ? ` ${contextNote}` : ''),
      toneScore: r.score,
      lengthType: length,
    };
  });

  return adjusted;
}

/**
 * Filter or preview length helper
 */
export function getLengthLabel(length: ReplyLength): string {
  switch (length) {
    case 'short': return 'Short & Punchy';
    case 'medium': return 'Balanced (1-2 sentences)';
    case 'detailed': return 'Detailed & Thoughtful';
  }
}
