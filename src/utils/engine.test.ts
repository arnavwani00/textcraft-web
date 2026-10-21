import test from 'node:test';
import assert from 'node:assert/strict';
import { 
  SITUATIONS, 
  VIBES, 
  DEMO_PRESETS,
  categorizeIncomingMessage, 
  calculateSoftDirectMeter, 
  generateSmartReplies,
  getLengthLabel
} from './engine.ts';

test('situations and vibes catalogs are properly structured', () => {
  assert.equal(SITUATIONS.length, 6, 'Must define all 6 primary situations');
  const situationIds = SITUATIONS.map(s => s.id);
  assert.ok(situationIds.includes('flirting'));
  assert.ok(situationIds.includes('argument'));
  assert.ok(situationIds.includes('professional'));
  assert.ok(situationIds.includes('dry-texter'));
  assert.ok(situationIds.includes('apology'));
  assert.ok(situationIds.includes('friendship-drama'));

  assert.ok(VIBES.length >= 6, 'Must include at least 6 primary vibes');
  const vibeIds = VIBES.map(v => v.id);
  assert.ok(vibeIds.includes('casual'));
  assert.ok(vibeIds.includes('funny'));
  assert.ok(vibeIds.includes('cold'));
  assert.ok(vibeIds.includes('flirty'));
  assert.ok(vibeIds.includes('direct'));
  assert.ok(vibeIds.includes('polite'));
});

test('categorizeIncomingMessage accurately flags key conversational patterns', () => {
  assert.equal(categorizeIncomingMessage('You looked so cute and gorgeous yesterday'), 'flirting');
  assert.equal(categorizeIncomingMessage('Why are you angry and blaming me for everything?'), 'argument');
  assert.equal(categorizeIncomingMessage('Can you send the Q3 deliverable deck before the client sync?'), 'professional');
  assert.equal(categorizeIncomingMessage('k'), 'dry-texter');
  assert.equal(categorizeIncomingMessage('lol'), 'dry-texter');
  assert.equal(categorizeIncomingMessage('I am so sorry I was late for dinner, total mistake'), 'apology');
  assert.equal(categorizeIncomingMessage('Saw you guys hung out yesterday, guess I got left out'), 'friendship-drama');
});

test('calculateSoftDirectMeter provides accurate labels and clamps intensity', () => {
  const soft = calculateSoftDirectMeter(15);
  assert.equal(soft.label, 'Gentle & Soft');
  assert.equal(soft.intensityPercent, 15);

  const balanced = calculateSoftDirectMeter(40);
  assert.equal(balanced.label, 'Balanced & Diplomatic');

  const assertive = calculateSoftDirectMeter(65);
  assert.equal(assertive.label, 'Clear & Assertive');

  const unfiltered = calculateSoftDirectMeter(90);
  assert.equal(unfiltered.label, 'Unfiltered Direct');

  // Clamping check
  const clampedBelow = calculateSoftDirectMeter(-10);
  assert.equal(clampedBelow.intensityPercent, 0);
  const clampedAbove = calculateSoftDirectMeter(120);
  assert.equal(clampedAbove.intensityPercent, 100);
});

test('generateSmartReplies returns multiple distinct, actionable options with explanations', () => {
  const replies = generateSmartReplies({
    incoming: 'You disappeared for three days and now you are texting me?',
    situation: 'flirting',
    vibe: 'flirty',
    intensity: 75,
    length: 'medium',
    context: 'We went on one date and had good banter.'
  });

  assert.ok(replies.length >= 3, 'Must return at least 3 distinct options');
  replies.forEach((r, idx) => {
    assert.ok(r.text.length > 0, `Reply ${idx} text should not be empty`);
    assert.ok(r.explanation.length > 0, `Reply ${idx} explanation should not be empty`);
    assert.ok(r.toneScore >= 0 && r.toneScore <= 100, `Tone score should be within 0-100`);
    assert.equal(r.situationId, 'flirting');
    assert.equal(r.vibeId, 'flirty');
  });

  // Verify unique texts
  const texts = new Set(replies.map(r => r.text));
  assert.equal(texts.size, replies.length, 'Generated replies must be uniquely phrased');
});

test('demo presets cover all core vibes with valid replies', () => {
  assert.ok(DEMO_PRESETS.disappeared);
  assert.ok(DEMO_PRESETS.comingOrNot);

  const vibes: Array<'casual' | 'funny' | 'cold' | 'flirty' | 'direct' | 'polite'> = [
    'casual', 'funny', 'cold', 'flirty', 'direct', 'polite'
  ];

  for (const v of vibes) {
    const preset = DEMO_PRESETS.disappeared.replies[v];
    assert.ok(preset, `Preset must have entry for vibe ${v}`);
    assert.ok(preset.reply.length > 5);
    assert.ok(preset.explanation.length > 5);
  }
});

test('length helper returns descriptive human labels', () => {
  assert.equal(getLengthLabel('short'), 'Short & Punchy');
  assert.equal(getLengthLabel('medium'), 'Balanced (1-2 sentences)');
  assert.equal(getLengthLabel('detailed'), 'Detailed & Thoughtful');
});
