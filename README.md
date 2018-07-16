# karahava

karahava is a 1-2 player fighting game that runs in the browser with Phaser.js.

## Gameplay Characteristics

Only 1 attack button, but two types of attacks: light and heavy. If you tap the attack button (press and release within 0.3 seconds), you use a light attack. If you press the attack button (press and release after 0.3 seconds), you use a heavy attack.
No grab, but can't block low, so low attacks fulfill the purpose of attacking through block. The only way to counter a low attack is to jump or parry low.

## Development Decisions

The game will also attempt to use Turkish as much as possible for a change. I have created Turkish characters in the font Sangbleu Empire Bold, and will use it as a webfont throughout the game.

The game's sprites will be 2D and pixelated. This will make it easier for me to draw them then if they are not pixelated. 3D characters would be cool, but I think it would be harder on framerates with mobile phones, and may not look good if I don't get the animations correct.
2D sprites usually have a lot of character, so I like that about them as well. I will start off with a sprite pack I find online (I like the 3rd Strike sprites but if I can find something easier that would be ideal), and graduate to making my own sprites.

## Controls

karahava characters are controlled with four keys each:

* q (left), w (right), e (jump), r (attack) for left player
* o (left), p (right), [ (jump), ] (attack) for right player

There are only four controls because this will make it simpler to play and reduce the number of possible moves (which in turn will reduce the number of options make it easier to play tactically).
Most importantly, I found that four buttons is ideal for a mobile fighting game in which one player has their controls on one side of the screen and vice versa.



## Moveset

#### < = left, > = right, ^ = jump, l = light attack, h = heavy attack

All movement keys represent holding them down at the same time unless otherwise. Multiple instances of the same character represent *double tapping* the key. An "x" after a held key indicates pressing attack **while** those keys are held. An "x" after a repeated key indicates tapping it immediately after the last tap of the repeated key.

All > represent forward, and < represent back (when on left side of screen). However, when character switches sides, these inputs also switch (as to be expected)

> Definitions
> Double tap: KeyDown, next KeyDown within 0.3 seconds
> if x keydown
>   if within 0.3 seconds after a repeated key and this would correspond with a move, execute that move.
>   else, use the currently held keys to determine the current move, and then execute that move.

All moves marked with trailing ? are questionable.
Move animation name is in [].

### Movement

```
    idle [idle]
>   move forward [move_f] 
<   move back [move_b]
>>  dash forward [dash_f]
<<  dash back [dash_b] (should we do air dashing?)
<>  duck [duck]
^   jump [jump]
<>^ superjump [superjump] ? (higher jump than normal a la sf3)
^   (midair) double jump [jump_double] ? [perhaps restricted to some characters] [perhaps if you jump on top of someone you launch yourself away from them like ibuki's taunt in sf3]
>   (KeyDown 0.2s after hit) parry high [parry_h]
<>  (KeyDown 0.2s after hit) parry low [parry_l] (identical keys to duck)
<   (held when hit) block (can't block low, therefore low attacks are the only attacks that can go through block, and thus fill in the role of throws)
```

### Ground Attacks

```
l   light attack [light]
>l  forward light attack [light_f]
<l  backward light attack [light_b]
<>l down light attack [light_d]
h   heavy attack [heavy]
>h  forward heavy attack [heavy_f]
<h  backward heavy attack [heavy_b]
<>h down heavy attack [heavy_d]
```

### Air Attacks

Still not sure if I should allow both light and heavy air attacks. I'm going to only allow 1 type of attack in the air and call it aerials for now for simplicity.
However if I decide to add more I will!

```
l   air attack [air] (we're using l here, but it doesn't depend on release time)
>l  air forward attack [air_f]
>l  air back attack [air_b]
<>l air down attack [air_d] (you won't actually duck in midair though)
```

### Special Attacks

I need to come up with key combos that are optimized for performing on a keyboard or touch screen rather than a joystick. (so no full circle turns and stuff).
Quarter circle turn and z move are difficult to emulate on keyboard, while natural on a joystick.
One thing that's easy to do on keyboard is hold down one key and tap on and off another. So I think I'm going to use that for the special moves like so.

midair ok!

```
>,<>,>,<>,l special attack forward [special_f] (I'm using two here so you don't do it by accident)
<,<>,<,<>,l special attack back [special_b]
>>l         dash attack forward [dash_attack_f]
>>b         dash attack back [dash_attack_b]
```

### Super Attacks

```
<>,<>,l super attack [super] (can't decide if this input is easier or harder than the specials, but this way there are two possible specials, but only 1 possible super)
```

## Possible Character Archetype

shoto-ish, + ninja rushdown

slow walk speed, fast/long dashes (makoto style)
implement normals first


light         = quick punch
heavy         = elbow hit
light_f       = long punch
heavy_f       = long kick
light_b       = uppercut (anti air)
heavy_b       = high kick (launcher) (ibuki)
light_d       = low punch
heavy_d       = sliding kick

air           = neutral kick (for crossups)
air_f         = forward punch
air_b         = kunai throw diagonal down (ibuki)
air_d         = axe kick (makoto)

special_f     = shoryuken 
special_b     = hadouken (guile ish because you have to move back)
dash_attack_f = dash punch (makoto)
dash_attack_b = throw bomb forward in arc (ibuki)

super         = super shoryuken



