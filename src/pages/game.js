import React, { useEffect, useRef } from 'react';

// --- GAME CONSTANTS ---
const TILE = 40;
const COLS = 20;
const ROWS = 15;
const WIDTH = COLS * TILE;
const HEIGHT = ROWS * TILE;

const GRAVITY = 0.45;
const FRICTION = 0.85;
const ACCEL = 0.7;
const MAX_SPEED = 5;
const MAX_FALL = 14;
const JUMP_FORCE = -13;

const MAX_ROOM_X = 3; // 4 rooms wide (0 to 3)
const MAX_ROOM_Y = 2; // 3 rooms tall (0 to 2)

// --- MAP DATA ---
// # = Wall/Floor, L = Lava, ^ = Spikes, D = Locked Door, X = Spawner
// C = Coin, E = Walker, P = Hopper, F = Flyer, W = Crawler
// S = Start, G = Goal/Trophy, H = Health, K = Key
const MAPS = {
  "0,0": [
    "####################",
    "#..................#",
    "#.K.W....C.........#",
    "###########........#",
    "#..................#",
    "#.C...E............#",
    "#######...##########",
    "#..................#",
    "#............C.....#",
    "#.....##########...#",
    "#..................#",
    "#C.................D", // Locked Door Top
    "###S...............D", // Locked Door Bottom
    "#######......###...#", 
    "########....########"  
  ],
  "1,0": [
    "####################",
    "#.........K........#",
    "#........###.......#",
    "#..^.............P.#",
    "#####..............#",
    "#.........C........#",
    "#......#####.......#",
    "#.......F..........#",
    "#..E...............#",
    "#####.....###......#",
    "#..................#", 
    "...................#", // Entrance Top
    "...................#", // Entrance Bottom
    "######LLLLLLLL######", 
    "####################"  
  ],
  "2,0": [
    "####################",
    "#..................#",
    "#..E..............H#",
    "######....##########",
    "#..........#...C...#",
    "#..........#..###..#",
    "#......##..#.......#",
    "#..C...............#",
    "#####..............#",
    "#..........#########",
    "#..................#",
    "#...................",
    "#...................",
    "#######......#######",
    "########....########"
  ],
  "3,0": [
    "####################",
    "#..................#",
    "#..................#",
    "#.....C.H....C..W..#",
    "#..######..######..#",
    "#..#............#..#",
    "#..#....C...C...#..#",
    "#..#.##########.#..#",
    "#..#............#..#",
    "#..##############..#",
    "#..................#",
    "...................#",
    "........C..........#",
    "#######......#######",
    "########....########"
  ],
  "0,1": [
    "########....########", 
    "#..................#",
    "#..E..............X#",
    "######....##########",
    "#..........#...H...#",
    "#..........#..###..#",
    "#......##..#.......#",
    "#..C...............#",
    "#####..............#",
    "#..........#########",
    "#..................#", 
    "#.......C..........D", // Locked Door Top
    "#......###.........D", // Locked Door Bottom
    "################...#", 
    "####################"  
  ],
  "1,1": [
    "####################", 
    "#..................#",
    "#..................#",
    "#.....C.....WC.....#",
    "#..######..######..#",
    "#..#............#..#",
    "#..#....C...C...#..#",
    "#..#.##########.#..#",
    "#..#............#..#",
    "#..##############..#",
    "#..................#", 
    "....................", // Entrance Top
    "........C...........", // Entrance Bottom
    "#######......##LL###", 
    "########....########"  
  ],
  "2,1": [
    "########....########",
    "#.........C........#",
    "#........###.......#",
    "#H.^.............P.#",
    "#####..............#",
    "#.......W.C........#",
    "#......#####.......#",
    "#.......F..........#",
    "#..E...............#",
    "#####.....##########",
    "#.............#....#",
    "..............#.....",
    "..............#K....",
    "######LLLLLLLL######",
    "####################"
  ],
  "3,1": [
    "########....########",
    "#..................#",
    "#..E............H.X#",
    "######....##########",
    "#..........#...C...#",
    "#..........#..###..#",
    "#......##..#.......#",
    "#..C...............#",
    "#####..............#",
    "#..........#########",
    "#..................#",
    "...................#",
    "...................#",
    "################...#",
    "########....########"
  ],
  "0,2": [
    "####################",
    "#..................#",
    "#...W....C.........#",
    "###########........#",
    "#...K..............#",
    "#X....E............#",
    "#######...##########",
    "#..................#",
    "#............C.....#",
    "#.....##########...#",
    "#..................#",
    "#C..................", // Locked Door Top
    "###.................", // Locked Door Bottom
    "#######......###...#",
    "####################"
  ],
  "1,2": [
    "########....########",
    "#X................X#",
    "#........##........#",
    "#.....C......C.....#",
    "#..######..######..#",
    "#..#............#..#",
    "#..#....C...C...#..#",
    "#..#.##########.#..#",
    "#..#............#..#",
    "#..##############..#",
    "#..................#",
    "...................D",
    "........C..........D",
    "#######......###...#",
    "####################"
  ],
  "2,2": [
    "####################",
    "#..................#",
    "#..E..............X#",
    "######....##########",
    "#......F...#...C...#",
    "#..........#..###..#",
    "#......##..#.......#",
    "#..C...............#",
    "#####.............X#",
    "#X.........#########",
    "#.......F..........#",
    "...................D", // Locked Door Top
    "...................D", // Locked Door Bottom
    "################...#",
    "####################"
  ],
  "3,2": [
    "########....########",
    "#..................#",
    "#.........C........#",
    "#........###.......#",
    "#..^.............P.#",
    "#####.............X#",
    "#.........C........#",
    "#......#####.......#",
    "#.......F..........#",
    "#..E...............#",
    "####...............#",
    "...................#",
    "..............^^..G#", // Goal
    "######LLLLLLLL######",
    "####################"
  ]
};

// --- STATIC MAP RETRIEVAL ---
const getMapLayout = (rx, ry) => {
  return MAPS[`${rx},${ry}`];
};

export default function GamePage() {
  const canvasRef = useRef(null);
  
    useEffect(() => {
        const preventScroll = (e) => {
            // Keys you want to disable default browser scrolling for
            const keysToBlock = ['ArrowUp', 'ArrowDown', ' ']; 

            if (keysToBlock.includes(e.key)) {
                e.preventDefault();
            }
        };

        // Attach the event listener to the window
        window.addEventListener('keydown', preventScroll, { passive: false });

        // Clean up the event listener when the component unmounts
        return () => {
            window.removeEventListener('keydown', preventScroll);
        };
    }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    // --- GAME STATE ---
    const keysMap = { left: false, right: false, up: false };
    const state = {
      status: 'playing', 
      roomX: 0,
      roomY: 0,
      score: 0,
      hp: 3,
      keys: 0,
      screenShake: 0,
      player: {
        x: 0, y: 0, w: 24, h: 32,
        vx: 0, vy: 0,
        isGrounded: false,
        facingRight: true,
        invuln: 0,
        wallJumpTimer: 0, 
        wallPose: 0,      
      },
      enemies: [],
      spawners: [],
      items: [],
      particles: [],
      collectedItems: new Set(),
      unlockedDoors: new Set(),
      mapTiles: [] 
    };

    // --- INITIALIZATION ---
    const loadRoom = () => {
      const mapKey = `${state.roomX},${state.roomY}`;
      const layout = getMapLayout(state.roomX, state.roomY);
      
      state.mapTiles = [];
      state.enemies = [];
      state.spawners = [];
      state.items = [];

      if (!layout) return;

      for (let r = 0; r < ROWS; r++) {
        for (let c = 0; c < COLS; c++) {
          const char = layout[r]?.[c] || '.';
          const x = c * TILE;
          const y = r * TILE;

          if (['#', '^', 'L', 'D', 'X'].includes(char)) {
            // Check if this specific door part was previously opened
            if (char === 'D' && state.unlockedDoors.has(`${mapKey}-${c}-${r}`)) continue;
            
            state.mapTiles.push({ r, c, type: char });
            
            if (char === 'X') {
              state.spawners.push({ id: `X-${c}-${r}`, x, y, w: TILE, h: TILE, spawnTimer: 90 });
            }
          } else if (char === 'S' && state.score === 0 && state.hp === 3) {
            state.player.x = x + (TILE - state.player.w) / 2;
            state.player.y = y + (TILE - state.player.h);
          } else if (char === 'E') {
            state.enemies.push({ type: 'E', x, y: y + 10, w: 28, h: 28, vx: 2, startX: x });
          } else if (char === 'P') {
            state.enemies.push({ type: 'P', x, y: y + 10, w: 28, h: 28, vx: 0, vy: 0, jumpTimer: 60 });
          } else if (char === 'F') {
            state.enemies.push({ type: 'F', parentId: 'world', x, y: y + 8, w: 24, h: 24, vx: 0, vy: 0 });
          } else if (char === 'W') {
            // Intelligent wall-crawlers (Geemers)
            let d = 0; let ew=24, eh=24, ex=x+8, ey=y+16;
            if (r < ROWS-1 && layout[r+1]?.[c] === '#') { d = 0; ey = y + 16; } // Floor -> Move Right (Wall Down)
            else if (r > 0 && layout[r-1]?.[c] === '#') { d = 2; ey = y; } // Ceil -> Move Left (Wall Up)
            else if (c > 0 && layout[r]?.[c-1] === '#') { d = 1; ex = x; ey = y+8; } // Left Wall -> Move Down (Wall Left)
            else if (c < COLS-1 && layout[r]?.[c+1] === '#') { d = 3; ex = x+16; ey = y+8; } // Right Wall -> Move Up (Wall Right)
            state.enemies.push({ type: 'W', x:ex, y:ey, w:ew, h:eh, d });
          } else if (['C', 'G', 'H', 'K'].includes(char)) {
            const id = `${mapKey}-${c}-${r}`;
            if (!state.collectedItems.has(id)) {
              state.items.push({ x: x + TILE/2, y: y + TILE/2, type: char, id });
            }
          }
        }
      }
    };

    const spawnParticles = (x, y, color, count = 10, speed = 3) => {
      for (let i = 0; i < count; i++) {
        state.particles.push({
          x, y,
          vx: (Math.random() - 0.5) * speed * 2,
          vy: (Math.random() - 0.5) * speed * 2,
          life: 1,
          decay: 0.02 + Math.random() * 0.03,
          color,
          size: 2 + Math.random() * 4
        });
      }
    };

    loadRoom();

    const getTile = (c, r) => {
      const safeC = Math.max(0, Math.min(c, COLS - 1));
      const safeR = Math.max(0, Math.min(r, ROWS - 1));
      const layout = getMapLayout(state.roomX, state.roomY);
      if (!layout) return '#';
      const char = layout[safeR]?.[safeC] || '.';
      
      // Respect unlocked state memory
      if (char === 'D' && state.unlockedDoors.has(`${state.roomX},${state.roomY}-${safeC}-${safeR}`)) return '.';
      
      // X spawners act as hard solid walls now
      return ['#', '^', 'L', 'D', 'X'].includes(char) ? char : '.';
    };

    const getCollisions = (rect, ignoreX = false) => {
      const tiles = [];
      const leftCol = Math.floor(rect.x / TILE);
      const rightCol = Math.floor((rect.x + rect.w - 0.1) / TILE);
      const topRow = Math.floor(rect.y / TILE);
      const bottomRow = Math.floor((rect.y + rect.h - 0.1) / TILE);

      for (let c = leftCol; c <= rightCol; c++) {
        for (let r = topRow; r <= bottomRow; r++) {
          const char = getTile(c, r);
          if (['#', 'D', 'X'].includes(char)) {
            // Let flyers bypass spawners
            if (ignoreX && char === 'X') continue;

            // Door Unlocking Logic
            if (char === 'D' && state.keys > 0 && rect === state.player) {
              state.keys--;
              const mapKey = `${state.roomX},${state.roomY}`;
              
              const unlockDoorPart = (dc, dr) => {
                 state.unlockedDoors.add(`${mapKey}-${dc}-${dr}`);
                 spawnParticles(dc * TILE + TILE/2, dr * TILE + TILE/2, '#fbbf24', 20, 6);
              };

              // Safely open this part and vertically connected parts to open the whole gate
              unlockDoorPart(c, r);
              if (getTile(c, r - 1) === 'D') unlockDoorPart(c, r - 1);
              if (getTile(c, r + 1) === 'D') unlockDoorPart(c, r + 1);
              
              // Immediately remove them from rendering to prevent 1-frame visual linger
              state.mapTiles = state.mapTiles.filter(t => t.type !== 'D' || !state.unlockedDoors.has(`${mapKey}-${t.c}-${t.r}`));
              continue; 
            }
            tiles.push({ r, c, type: char });
          }
        }
      }
      return tiles;
    };

    // --- INPUT HANDLING ---
    const handleKeyDown = (e) => {
      if (e.key === 'a' || e.key === 'ArrowLeft') keysMap.left = true;
      if (e.key === 'd' || e.key === 'ArrowRight') keysMap.right = true;
      if (e.key === 'w' || e.key === 'ArrowUp' || e.key === ' ') {
        if (!keysMap.up && state.status === 'playing') {
          const p = state.player;
          if (p.isGrounded) {
            p.vy = JUMP_FORCE; p.isGrounded = false;
            spawnParticles(p.x + p.w/2, p.y + p.h, '#e5e7eb', 5, 2);
          } else {
            const touchLeft = getCollisions({ x: p.x - TILE/2, y: p.y, w: p.w, h: p.h }).length > 0;
            const touchRight = getCollisions({ x: p.x + TILE/2, y: p.y, w: p.w, h: p.h }).length > 0;
            
            if (touchLeft && keysMap.right) {
              p.vy = JUMP_FORCE; p.vx = 8; p.facingRight = true; p.wallJumpTimer = 6;
              spawnParticles(p.x, p.y + p.h/2, '#06b6d4', 10, 4);
            } else if (touchRight && keysMap.left) {
              p.vy = JUMP_FORCE; p.vx = -8; p.facingRight = false; p.wallJumpTimer = 6;
              spawnParticles(p.x + p.w, p.y + p.h/2, '#06b6d4', 10, 4);
            }
          }
        }
        keysMap.up = true;
      }
      if (e.key === 'r' && state.status !== 'playing') resetGame();
    };

    const handleKeyUp = (e) => {
      if (e.key === 'a' || e.key === 'ArrowLeft') keysMap.left = false;
      if (e.key === 'd' || e.key === 'ArrowRight') keysMap.right = false;
      if (e.key === 'w' || e.key === 'ArrowUp' || e.key === ' ') keysMap.up = false;
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    const resetGame = () => {
      state.status = 'playing';
      state.hp = 3; state.keys = 0; state.score = 0;
      state.roomX = 0; state.roomY = 0;
      state.collectedItems.clear();
      state.unlockedDoors.clear(); // Re-lock all doors on restart!
      keysMap.left = false; keysMap.right = false; keysMap.up = false;
      loadRoom();
    };

    const damagePlayer = (srcX) => {
      if (state.player.invuln > 0 || state.status !== 'playing') return;
      state.hp--; state.player.invuln = 60; state.screenShake = 15;
      state.player.vy = -6; state.player.vx = state.player.x > srcX ? 8 : -8;
      spawnParticles(state.player.x + state.player.w/2, state.player.y + state.player.h/2, '#ef4444', 15, 4);
      if (state.hp <= 0) state.status = 'gameover';
    };

    // --- GAME LOOP ---
    let animationId;
    const update = () => {
      if (state.status !== 'playing') return;
      const p = state.player;

      if (p.invuln > 0) p.invuln--;
      if (state.screenShake > 0) state.screenShake--;

      p.wallPose = 0;
      if (!p.isGrounded) {
        const touchLeft = getCollisions({ x: p.x - 14, y: p.y, w: p.w, h: p.h }).length > 0;
        const touchRight = getCollisions({ x: p.x + 14, y: p.y, w: p.w, h: p.h }).length > 0;
        if (touchLeft && keysMap.right) p.wallPose = -1;
        if (touchRight && keysMap.left) p.wallPose = 1;
      }

      // Horizontal
      if (p.wallJumpTimer > 0) {
        p.wallJumpTimer--;
        if (keysMap.left) { p.vx -= ACCEL * 0.2; p.facingRight = false; }
        if (keysMap.right) { p.vx += ACCEL * 0.2; p.facingRight = true; }
      } else {
        if (keysMap.left) { p.vx -= ACCEL; p.facingRight = false; }
        if (keysMap.right) { p.vx += ACCEL; p.facingRight = true; }
      }
      p.vx *= FRICTION;
      if (Math.abs(p.vx) > MAX_SPEED && p.wallJumpTimer === 0) p.vx = Math.sign(p.vx) * MAX_SPEED;

      p.x += p.vx;
      const xColls = getCollisions(p);
      if (xColls.length > 0) {
        if (p.vx > 0) p.x = xColls[0].c * TILE - p.w;
        else p.x = xColls[0].c * TILE + TILE;
        p.vx = 0;
      }

      // Vertical
      p.vy += GRAVITY;
      if (p.vy > MAX_FALL) p.vy = MAX_FALL;
      
      p.y += p.vy;
      p.isGrounded = false;
      const yColls = getCollisions(p);
      if (yColls.length > 0) {
        if (p.vy > 0) { p.y = yColls[0].r * TILE - p.h; p.isGrounded = true; } 
        else { p.y = yColls[0].r * TILE + TILE; }
        p.vy = 0;
      }

      // Room Transitions
      let transitioned = false;
      let nextRoomX = state.roomX, nextRoomY = state.roomY;
      if (p.x > WIDTH) nextRoomX++; else if (p.x + p.w < 0) nextRoomX--;
      else if (p.y > HEIGHT) nextRoomY++; else if (p.y + p.h < 0) nextRoomY--;
      
      if (nextRoomX !== state.roomX || nextRoomY !== state.roomY) {
        if (nextRoomX >= 0 && nextRoomX <= MAX_ROOM_X && nextRoomY >= 0 && nextRoomY <= MAX_ROOM_Y) {
          state.roomX = nextRoomX; state.roomY = nextRoomY;
          if (p.x > WIDTH) p.x = 0; else if (p.x + p.w < 0) p.x = WIDTH - p.w;
          else if (p.y > HEIGHT) p.y = 0; else if (p.y + p.h < 0) p.y = HEIGHT - p.h;
          transitioned = true;
        } else {
          if (p.x > WIDTH) p.x = WIDTH - p.w; else if (p.x + p.w < 0) p.x = 0;
          if (p.y > HEIGHT) p.y = HEIGHT - p.h; else if (p.y + p.h < 0) p.y = 0;
        }
      }
      
      if (transitioned) { loadRoom(); return; }

      const centerCol = Math.floor((p.x + p.w/2) / TILE);
      const centerRow = Math.floor((p.y + p.h/2) / TILE);
      const footRow = Math.floor((p.y + p.h - 1) / TILE);
      
      if (getTile(centerCol, footRow) === '^' || getTile(centerCol, centerRow) === 'L' || getTile(centerCol, footRow) === 'L') {
        damagePlayer(centerCol * TILE + TILE/2);
      }

      // --- SPAWNER LOGIC ---
      for (const sp of state.spawners) {
        sp.spawnTimer--;
        if (sp.spawnTimer <= 0) {
          const childCount = state.enemies.filter(en => en.type === 'F' && en.parentId === sp.id).length;
          // Spawn limit of 2 active children per spawner
          if (childCount < 2 && Math.hypot(p.x - sp.x, p.y - sp.y) < 400) {
            state.enemies.push({ type: 'F', parentId: sp.id, x: sp.x + 8, y: sp.y + 8, w: 24, h: 24, vx: 0, vy: -2 });
            spawnParticles(sp.x + TILE/2, sp.y + TILE/2, '#f87171', 15, 3);
          }
          sp.spawnTimer = 180 + Math.random() * 60;
        }
      }

      // --- ENEMY LOGIC ---
      for (let i = state.enemies.length - 1; i >= 0; i--) {
        const e = state.enemies[i];
        
        if (e.type === 'E') {
          e.x += e.vx;
          const eColsX = getCollisions(e);
          const headX = e.vx > 0 ? e.x + e.w : e.x;
          const headCol = Math.floor(headX/TILE);
          const groundType = getTile(headCol, Math.floor((e.y + e.h + 2)/TILE));
          
          if (eColsX.length > 0 || !['#','D','X'].includes(groundType) || headCol < 0 || headCol >= COLS) {
            if (eColsX.length > 0) e.x = e.vx > 0 ? eColsX[0].c * TILE - e.w : eColsX[0].c * TILE + TILE;
            else if (headCol < 0 || headCol >= COLS) e.x = e.vx > 0 ? WIDTH - e.w : 0;
            e.vx *= -1;
          }
        } 
        else if (e.type === 'P') { // Hopper
          e.vy += GRAVITY;
          e.y += e.vy;
          const yCols = getCollisions(e);
          let grounded = false;
          if (yCols.length > 0) {
            if (e.vy > 0) { e.y = yCols[0].r * TILE - e.h; grounded = true; }
            else { e.y = yCols[0].r * TILE + TILE; }
            e.vy = 0;
          }
          
          e.x += e.vx;
          const xCols = getCollisions(e);
          if (xCols.length > 0) {
            e.x = e.vx > 0 ? xCols[0].c * TILE - e.w : xCols[0].c * TILE + TILE;
            e.vx *= -1;
          }
          
          if (grounded) {
            e.vx = 0;
            e.jumpTimer--;
            if (e.jumpTimer <= 0) {
              e.vy = JUMP_FORCE * 0.8;
              e.vx = p.x < e.x ? -3.5 : 3.5;
              e.jumpTimer = 60 + Math.random() * 60;
              spawnParticles(e.x+e.w/2, e.y+e.h, '#4ade80', 5, 2);
            }
          }
        }
        else if (e.type === 'F') { // Flyer
          const angle = Math.atan2(p.y + p.h/2 - (e.y + e.h/2), p.x + p.w/2 - (e.x + e.w/2));
          e.vx += Math.cos(angle) * 0.05;
          e.vy += Math.sin(angle) * 0.05;
          
          const speed = Math.hypot(e.vx, e.vy);
          if (speed > 1.1) { e.vx = (e.vx / speed) * 1.1; e.vy = (e.vy / speed) * 1.1; }
          
          e.x += e.vx; 
          if (getCollisions(e, true).length > 0) { e.x -= e.vx; e.vx = 0; }
          
          e.y += e.vy; 
          if (getCollisions(e, true).length > 0) { e.y -= e.vy; e.vy = 0; }
        }
        else if (e.type === 'W') { // Intelligent AABB Crawler (Geemer)
          const dirs = [{x:1,y:0}, {x:0,y:1}, {x:-1,y:0}, {x:0,y:-1}]; // 0:R, 1:D, 2:L, 3:U
          let speed = 1;
          let fwd = dirs[e.d];
          
          e.x += fwd.x * speed;
          e.y += fwd.y * speed;
          
          // Reusable boundary+AABB collision check for crawlers
          const checkRect = (rect) => {
             // Treat off-screen canvas edges as perfectly solid geometry
             if (rect.x < 0 || rect.x + rect.w > WIDTH || rect.y < 0 || rect.y + rect.h > HEIGHT) return true;
             return getCollisions(rect).length > 0;
          };

          // 1. Check if we bumped into a wall directly in front (Inside Corner)
          if (checkRect(e)) {
             // Undo step
             e.x -= fwd.x * speed;
             e.y -= fwd.y * speed;
             // Turn Left (CCW)
             e.d = (e.d + 3) % 4; 
          } else {
             // 2. Check if the floor beneath us vanished (Outside Corner)
             let right = dirs[(e.d + 1) % 4];
             
             // Extrude a sensor downward into the floor surface
             let floorSensor = {
                 x: e.x + right.x * 4,
                 y: e.y + right.y * 4,
                 w: e.w,
                 h: e.h
             };
             
             if (!checkRect(floorSensor)) {
                 // The floor ended! 
                 e.d = (e.d + 1) % 4; // Turn Right (CW)
                 
                 // Snap slightly forward and down into the new plane so we don't spin-out
                 e.x += right.x * 4;
                 e.y += right.y * 4;
             }
          }
        }

        // Enemy Collision with Player
        if (p.x < e.x + e.w && p.x + p.w > e.x && p.y < e.y + e.h && p.y + p.h > e.y) {
          let canStomp = p.vy > 0 && p.y + p.h < e.y + e.h / 2;
          if (e.type === 'W' && e.d !== 0) canStomp = false; // Only stomp floor crawlers

          if (canStomp) {
            state.enemies.splice(i, 1);
            p.vy = JUMP_FORCE * 0.8;
            state.score += 5;
            spawnParticles(e.x + e.w/2, e.y + e.h/2, '#ef4444', 20, 5);
          } else {
            damagePlayer(e.x + e.w/2);
          }
        }
      }

      // --- ITEM COLLECTION ---
      for (let i = state.items.length - 1; i >= 0; i--) {
        const item = state.items[i];
        const dist = Math.hypot((p.x + p.w/2) - item.x, (p.y + p.h/2) - item.y);
        
        if (dist < TILE) {
          if (item.type === 'H') {
            if (state.hp < 3) {
              state.hp++;
              state.collectedItems.add(item.id); state.items.splice(i, 1);
              spawnParticles(item.x, item.y, '#ef4444', 15, 3);
            }
            continue; 
          }

          state.collectedItems.add(item.id);
          state.items.splice(i, 1);
          
          if (item.type === 'K') { state.keys++; spawnParticles(item.x, item.y, '#facc15', 12, 3); }
          else if (item.type === 'C') { state.score += 10; spawnParticles(item.x, item.y, '#fbbf24', 12, 3); } 
          else if (item.type === 'G') { state.status = 'won'; spawnParticles(item.x, item.y, '#10b981', 50, 8); }
        }
      }

      for (let i = state.particles.length - 1; i >= 0; i--) {
        const pt = state.particles[i];
        pt.x += pt.vx; pt.y += pt.vy; pt.life -= pt.decay;
        if (pt.life <= 0) state.particles.splice(i, 1);
      }
    };

    const draw = () => {
      ctx.fillStyle = '#111827';
      ctx.fillRect(0, 0, WIDTH, HEIGHT);
      ctx.save();
      
      if (state.screenShake > 0) {
        const mag = state.screenShake * 0.5;
        ctx.translate((Math.random()-0.5)*mag, (Math.random()-0.5)*mag);
      }

      const time = Date.now();
      
      for (const t of state.mapTiles) {
        const x = t.c * TILE, y = t.r * TILE;
        if (t.type === '#') {
          ctx.fillStyle = '#374151'; ctx.fillRect(x, y, TILE, TILE);
          ctx.fillStyle = '#4b5563'; ctx.fillRect(x, y, TILE, 4);
          ctx.fillStyle = '#1f2937'; ctx.fillRect(x + 4, y + 4, TILE - 8, TILE - 8);
        } else if (t.type === 'D') {
          // Visually coalesce the door blocks into a single tall gate
          const isTop = !state.mapTiles.some(other => other.c === t.c && other.r === t.r - 1 && other.type === 'D');
          
          if (isTop) {
            const isDouble = state.mapTiles.some(other => other.c === t.c && other.r === t.r + 1 && other.type === 'D');
            const h = isDouble ? TILE * 2 : TILE; // 1 or 2 blocks tall
            
            ctx.fillStyle = '#78350f'; ctx.fillRect(x, y, TILE, h);
            ctx.fillStyle = '#92400e'; ctx.fillRect(x, y, TILE, 4); 
            ctx.fillRect(x + 8, y, 4, h); ctx.fillRect(x + 28, y, 4, h);
            
            // Single Centered Keyhole
            ctx.fillStyle = '#facc15'; ctx.beginPath(); ctx.arc(x + TILE/2, y + h/2 - 2, 4, 0, Math.PI*2); ctx.fill();
            ctx.fillRect(x + TILE/2 - 2, y + h/2, 4, 8);
          }
        } else if (t.type === 'X') {
          ctx.fillStyle = '#1f2937'; ctx.fillRect(x, y, TILE, TILE);
          ctx.fillStyle = '#374151'; ctx.fillRect(x+4, y+4, TILE-8, TILE-8);
          ctx.fillStyle = `rgba(248, 113, 113, ${0.5 + Math.sin(time/200)*0.5})`;
          ctx.fillRect(x+10, y+10, 20, 20);
        } else if (t.type === 'L') {
          ctx.fillStyle = '#ea580c'; ctx.fillRect(x, y + 10, TILE, TILE - 10);
          ctx.fillStyle = '#f97316'; ctx.beginPath();
          for (let i = 0; i <= TILE; i += 5) { ctx.lineTo(x + i, y + 10 + Math.sin((time/200) + (x+i)/20) * 4); }
          ctx.lineTo(x + TILE, y + TILE); ctx.lineTo(x, y + TILE); ctx.fill();
        } else if (t.type === '^') {
          ctx.fillStyle = '#9ca3af';
          for (let i = 0; i < 3; i++) {
            const sx = x + (i * TILE / 3); ctx.beginPath();
            ctx.moveTo(sx, y + TILE); ctx.lineTo(sx + (TILE / 6), y + Math.max(10, TILE/2)); ctx.lineTo(sx + (TILE / 3), y + TILE); ctx.fill();
          }
        }
      }

      for (const item of state.items) {
        const hY = Math.sin(time / 200 + item.x) * 4;
        if (item.type === 'C') {
          ctx.fillStyle = '#fbbf24'; ctx.beginPath(); ctx.arc(item.x, item.y + hY, 10, 0, Math.PI * 2); ctx.fill();
          ctx.fillStyle = '#f59e0b'; ctx.beginPath(); ctx.arc(item.x, item.y + hY, 6, 0, Math.PI * 2); ctx.fill();
        } else if (item.type === 'K') {
          ctx.fillStyle = '#facc15'; ctx.beginPath(); ctx.arc(item.x - 4, item.y + hY, 6, 0, Math.PI * 2); ctx.fill();
          ctx.fillRect(item.x - 4, item.y + hY - 2, 14, 4); ctx.fillRect(item.x + 6, item.y + hY, 2, 6);
        } else if (item.type === 'H') {
          ctx.fillStyle = '#ef4444'; ctx.beginPath();
          ctx.arc(item.x - 4, item.y + hY - 2, 4, Math.PI, 0); ctx.arc(item.x + 4, item.y + hY - 2, 4, Math.PI, 0);
          ctx.lineTo(item.x, item.y + hY + 6); ctx.fill();
        } else if (item.type === 'G') {
          ctx.fillStyle = '#10b981'; ctx.beginPath(); ctx.moveTo(item.x, item.y - 15 + hY);
          ctx.lineTo(item.x + 15, item.y + hY); ctx.lineTo(item.x, item.y + 15 + hY); ctx.lineTo(item.x - 15, item.y + hY); ctx.fill();
        }
      }

      for (const e of state.enemies) {
        if (e.type === 'E') {
          ctx.fillStyle = '#ef4444'; ctx.fillRect(e.x, e.y, e.w, e.h);
          ctx.fillStyle = '#fee2e2'; ctx.fillRect(e.vx > 0 ? e.x + e.w - 12 : e.x + 4, e.y + 6, 8, 8);
          ctx.fillStyle = '#991b1b'; ctx.fillRect(e.vx > 0 ? e.x + e.w - 8 : e.x + 4, e.y + 8, 4, 4);
        } else if (e.type === 'P') {
          ctx.fillStyle = '#4ade80'; 
          const stretch = e.vy !== 0 ? 1.2 : 1.0; const squash = e.vy !== 0 ? 0.8 : 1.0;
          ctx.fillRect(e.x + (e.w - e.w*squash)/2, e.y + e.h - e.h*stretch, e.w*squash, e.h*stretch);
          ctx.fillStyle = '#ffffff'; ctx.fillRect(e.vx > 0 ? e.x + e.w - 10 : e.x + 2, e.y - 4, 8, 8);
          ctx.fillStyle = '#064e3b'; ctx.fillRect(e.vx > 0 ? e.x + e.w - 6 : e.x + 2, e.y - 2, 4, 4);
        } else if (e.type === 'F') {
          ctx.fillStyle = '#a855f7'; ctx.beginPath(); ctx.moveTo(e.x+e.w/2, e.y); ctx.lineTo(e.x+e.w, e.y+e.h/2);
          ctx.lineTo(e.x+e.w/2, e.y+e.h); ctx.lineTo(e.x, e.y+e.h/2); ctx.fill();
          ctx.fillStyle = '#fdf4ff'; ctx.fillRect(e.x+e.w/2-4, e.y+e.h/2-2, 3, 3); ctx.fillRect(e.x+e.w/2+1, e.y+e.h/2-2, 3, 3);
        } else if (e.type === 'W') {
          ctx.fillStyle = '#f97316'; ctx.fillRect(e.x, e.y, e.w, e.h);
          ctx.fillStyle = '#000000'; // Eyes follow crawling orientation
          if (e.d === 0) { ctx.fillRect(e.x+e.w-6, e.y+4, 4, 4); } 
          else if (e.d === 1) { ctx.fillRect(e.x+e.w-8, e.y+e.h-6, 4, 4); } 
          else if (e.d === 2) { ctx.fillRect(e.x+2, e.y+e.h-8, 4, 4); } 
          else if (e.d === 3) { ctx.fillRect(e.x+4, e.y+2, 4, 4); } 
        }
      }

      const p = state.player;
      if (p.invuln === 0 || Math.floor(time / 100) % 2 === 0) {
        if (p.wallPose !== 0) {
          const dW = p.w * 0.8, dH = p.h * 1.1, dX = p.wallPose === -1 ? p.x : p.x + (p.w - dW);
          ctx.fillStyle = '#06b6d4'; ctx.fillRect(dX, p.y, dW, dH);
          ctx.fillStyle = '#ffffff'; const vX = p.wallPose === -1 ? dX + dW - 8 : dX + 2; ctx.fillRect(vX, p.y + 6, 6, 6);
          ctx.fillStyle = '#0891b2'; ctx.fillRect(p.wallPose === -1 ? vX + 4 : vX, p.y + 6, 2, 6);
        } else {
          ctx.fillStyle = '#06b6d4';
          let stretch = 1, squash = 1;
          if (!p.isGrounded) { stretch = 1.1; squash = 0.9; } else if (Math.abs(p.vx) > 0.5) { squash = 1.05; stretch = 0.95; }
          const dW = p.w * squash, dH = p.h * stretch, dX = p.x + (p.w - dW) / 2, dY = p.y + (p.h - dH);
          ctx.fillRect(dX, dY, dW, dH);
          ctx.fillStyle = '#ffffff'; const vW = 10, vX = p.facingRight ? dX + dW - vW - 2 : dX + 2; ctx.fillRect(vX, dY + 6, vW, 6);
          ctx.fillStyle = '#0891b2'; ctx.fillRect(p.facingRight ? vX + 6 : vX, dY + 6, 4, 6);
        }
      }

      for (const pt of state.particles) {
        ctx.fillStyle = pt.color; ctx.globalAlpha = pt.life; ctx.fillRect(pt.x - pt.size/2, pt.y - pt.size/2, pt.size, pt.size);
      }
      ctx.globalAlpha = 1.0;
      ctx.restore();

      // UI
      ctx.fillStyle = 'rgba(0,0,0,0.5)'; ctx.fillRect(10, 10, 260, 40);
      
      ctx.fillStyle = '#ef4444';
      for(let i = 0; i < 3; i++) {
        if (i < state.hp) ctx.fillRect(20 + i * 22, 20, 16, 16); else { ctx.strokeStyle = '#ef4444'; ctx.strokeRect(20 + i * 22, 20, 16, 16); }
      }

      ctx.fillStyle = '#fbbf24'; ctx.beginPath(); ctx.arc(110, 28, 8, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = '#ffffff'; ctx.font = 'bold 18px monospace'; ctx.fillText(`x ${state.score}`, 125, 34);

      ctx.fillStyle = '#facc15'; ctx.beginPath(); ctx.arc(200, 28, 6, 0, Math.PI * 2); ctx.fill();
      ctx.fillRect(200, 26, 12, 4); ctx.fillRect(210, 28, 2, 4);
      ctx.fillStyle = '#ffffff'; ctx.fillText(`x ${state.keys}`, 220, 34);

      if (state.status === 'gameover') {
        ctx.fillStyle = 'rgba(0,0,0,0.7)'; ctx.fillRect(0, 0, WIDTH, HEIGHT); ctx.fillStyle = '#ef4444';
        ctx.font = 'bold 48px monospace'; ctx.textAlign = 'center'; ctx.fillText('GAME OVER', WIDTH/2, HEIGHT/2);
        ctx.fillStyle = '#ffffff'; ctx.font = '20px monospace'; ctx.fillText('Press R to Restart', WIDTH/2, HEIGHT/2 + 40); ctx.textAlign = 'left';
      } else if (state.status === 'won') {
        ctx.fillStyle = 'rgba(0,0,0,0.7)'; ctx.fillRect(0, 0, WIDTH, HEIGHT); ctx.fillStyle = '#10b981';
        ctx.font = 'bold 48px monospace'; ctx.textAlign = 'center'; ctx.fillText('YOU WON!', WIDTH/2, HEIGHT/2 - 20);
        ctx.fillStyle = '#fbbf24'; ctx.font = '24px monospace'; ctx.fillText(`Final Score: ${state.score}`, WIDTH/2, HEIGHT/2 + 20);
        ctx.fillStyle = '#ffffff'; ctx.font = '20px monospace'; ctx.fillText('Press R to Play Again', WIDTH/2, HEIGHT/2 + 60); ctx.textAlign = 'left';
      }
    };

    const loop = () => { update(); draw(); animationId = requestAnimationFrame(loop); };
    loop();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('keydown', handleKeyDown); window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  return (
        <div className="canvas-quest-container">
            <div className="header-section">
                <h1>
                    Portfolio Quest
                </h1>
                <p>
                    A / D to move. W to jump. Collect Keys to bust through brown locked doors! 
                    <br/>
                    <span className="highlight-cyan">Wall Jump:</span> Jump towards a wall, hold <span className="highlight-white">AWAY</span> from it to pose, then press <span className="highlight-white">JUMP</span>!
                </p>
            </div>
            
            <div className="canvas-wrapper">
                <canvas style={{width: WIDTH * 0.75, aspectRatio: 4/3, maxWidth: '100%'}} ref={canvasRef} width={WIDTH} height={HEIGHT} />
            </div>
        </div>
  );
}