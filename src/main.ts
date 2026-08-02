// ---------- Function 1: initializeSeats ----------
function initializeSeats(): number[][] {
  // Builds an 8-row x 10-column matrix, all seats start empty (0)
  const theaterRoom: number[][] = [];
  let rows = 0;

  while (rows < 8) {
    const rowSeats: number[] = [];
    let seats = 0;

    while (seats < 10) {
      rowSeats.push(0);
      seats += 1;
    }

    theaterRoom.push(rowSeats);
    rows += 1;
  }

  return theaterRoom;
}

// ---------- Function 2: displaySeats ----------
function displaySeats(theaterRoom: number[][]): void {
  // Prints the seating matrix to the console with row/column numbers
  // X = occupied, L = available
  let header = "   ";
  for (let col = 0; col < 10; col++) {
    header += col + " ";
  }
  console.log(header);

  let rows = 0;
  while (rows < 8) {
    let rowText = rows + "  ";
    let seats = 0;
    while (seats < 10) {
      if (theaterRoom[rows][seats] === 1) {
        rowText += "X ";
      } else {
        rowText += "L ";
      }
      seats += 1;
    }
    console.log(rowText);
    rows += 1;
  }
}

// ---------- Function 3: reserveSeat ----------
function reserveSeat(theaterRoom: number[][], row: number, col: number): string {
  // Reserves a seat if available, returns a message either way
  if (theaterRoom[row][col] === 1) {
    return "Seat already taken";
  } else {
    theaterRoom[row][col] = 1;
    return "Reservation confirmed";
  }
}

// ---------- Function 4: countSeats ----------
function countSeats(theaterRoom: number[][]): { occupied: number; available: number } {
  // Counts occupied and available seats across the whole room
  let occupied = 0;
  let available = 0;
  let rows = 0;

  while (rows < 8) {
    let seats = 0;
    while (seats < 10) {
      if (theaterRoom[rows][seats] === 1) {
        occupied += 1;
      } else {
        available += 1;
      }
      seats += 1;
    }
    rows += 1;
  }

  return { occupied: occupied, available: available };
}

// ---------- Function 5: findAdjacentSeats ----------
function findAdjacentSeats(theaterRoom: number[][]): string {
  // Searches for the first pair of two adjacent available seats in the same row
  let rows = 0;
  while (rows < 8) {
    let seats = 0;
    while (seats < 9) {
      if (theaterRoom[rows][seats] === 0 && theaterRoom[rows][seats + 1] === 0) {
        return "Adjacent seats found at row " + rows + ", columns " + seats + " and " + (seats + 1);
      }
      seats += 1;
    }
    rows += 1;
  }
  return "No adjacent seats available";
}

// ---------- Testing & Output: run the 4 required scenarios ----------

console.log("=== Scenario 1: Empty room (all seats available) ===");
const room1 = initializeSeats();
displaySeats(room1);
console.log(countSeats(room1));
console.log(findAdjacentSeats(room1));

console.log("\n=== Scenario 2: Partially filled room ===");
const room2 = initializeSeats();
console.log(reserveSeat(room2, 0, 1));
console.log(reserveSeat(room2, 0, 4));
console.log(reserveSeat(room2, 3, 5));
console.log(reserveSeat(room2, 5, 2));
displaySeats(room2);
console.log(countSeats(room2));
console.log(findAdjacentSeats(room2));

console.log("\n=== Scenario 3: Nearly full room with only scattered single seats ===");
const room3 = initializeSeats();
for (let r = 0; r < 8; r++) {
  for (let c = 0; c < 10; c++) {
    room3[r][c] = 1;
  }
}
room3[2][4] = 0;
room3[5][8] = 0;
room3[7][0] = 0;
displaySeats(room3);
console.log(countSeats(room3));
console.log(findAdjacentSeats(room3));

console.log("\n=== Scenario 4: Full room (no seats available) ===");
const room4 = initializeSeats();
for (let r = 0; r < 8; r++) {
  for (let c = 0; c < 10; c++) {
    room4[r][c] = 1;
  }
}
displaySeats(room4);
console.log(countSeats(room4));
console.log(findAdjacentSeats(room4));

console.log("\n=== Testing reserveSeat validation ===");
const room5 = initializeSeats();
console.log(reserveSeat(room5, 2, 3));
console.log(reserveSeat(room5, 2, 3));
