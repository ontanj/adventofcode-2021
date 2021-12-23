const { exit } = require("process");

const data = require("fs")
  .readFileSync("../../inputs/input19.txt")
  .toString()
  .slice(0, -1)
  .split("\n\n")
  .map((scanner) =>
    scanner
      .split("\n")
      .slice(1)
      .map((row) => row.split(",").map(Number))
  );

const euclideanDistance = (a, b) =>
  Math.sqrt(a.reduce((acc, v, i) => acc + (v - b[i]) ** 2, 0));
const manhattanDistance = (a, b) =>
  a.reduce((acc, v, i) => acc + Math.abs(v - b[i]), 0);

const distances = data.map((scanner) =>
  scanner.map((pos, i, array) => ({
    pos,
    distances: array.map((pos2) => euclideanDistance(pos, pos2)),
  }))
);

const intersection = (a, b) => {
  const set = new Set(b);
  return Array.from(new Set([...new Set(a)].filter((x) => set.has(x))));
};

const scanPositions = [[0, 0, 0]];
let knownBeacons = distances[0];
const merged = [0];
while (true) {
  for (let beaconId = 0; beaconId < knownBeacons.length; beaconId += 1) {
    let match = false;
    for (
      let scannerToCompareId = 1;
      scannerToCompareId < distances.length;
      scannerToCompareId += 1
    ) {
      if (merged.includes(scannerToCompareId)) {
        continue;
      }
      for (
        let beaconToCompareId = 0;
        beaconToCompareId < distances[scannerToCompareId].length;
        beaconToCompareId += 1
      ) {
        const scannerToCompare = distances[scannerToCompareId];
        const intersectionDistances = intersection(
          knownBeacons[beaconId].distances,
          scannerToCompare[beaconToCompareId].distances
        );

        if (intersectionDistances.length < 12) continue;

        const scannerOverlappingPreNormalization = knownBeacons
          .filter(({ distances }) =>
            intersectionDistances.includes(distances[beaconId])
          )
          .map(({ pos, distances }) => ({
            pos,
            distance: distances[beaconId],
          }))
          .sort(
            ({ distance }, { distance: distance2 }) => distance - distance2
          );
        const scannerOverlapping = scannerOverlappingPreNormalization.map(
          ({ pos, distance }, k, [{ pos: beacon1pos }]) => ({
            pos: pos.map((v, i) => v - beacon1pos[i]),
            distance,
          })
        );

        const scannerCompOverlappingPreNormalization = scannerToCompare
          .filter(({ distances }) =>
            intersectionDistances.includes(distances[beaconToCompareId])
          )
          .map(({ pos, distances }) => ({
            pos,
            distance: distances[beaconToCompareId],
          }))
          .sort(
            ({ distance }, { distance: distance2 }) => distance - distance2
          );
        const scannerCompOverlapping =
          scannerCompOverlappingPreNormalization.map(
            ({ pos, distance }, k, [{ pos: beacon1pos }]) => ({
              pos: pos.map((v, i) => v - beacon1pos[i]),
              distance,
            })
          );

        const refPos = scannerOverlapping[1].pos;
        const compPos = scannerCompOverlapping[1].pos;

        const transformers = scannerOverlapping[0].pos.map((c, dir) => {
          for (let i = dir; i < dir + 3; i += 1) {
            if (Math.abs(refPos[dir]) === Math.abs(compPos[i % 3])) {
              return (coord) => (coord[i % 3] * compPos[i % 3]) / refPos[dir];
            }
          }
        });

        scanPositions.push(
          transformers.map(
            (f, i) =>
              scannerOverlappingPreNormalization[0].pos[i] -
              f(scannerCompOverlappingPreNormalization[0].pos)
          )
        );

        const diffs = transformers.map(
          (f, i) =>
            knownBeacons[beaconId].pos[i] -
            f(scannerToCompare[beaconToCompareId].pos)
        );
        const rotated = scannerToCompare
          .filter(
            ({ distances }) =>
              !intersectionDistances.includes(distances[beaconToCompareId])
          )
          .map(({ pos }) => ({
            pos: transformers.map((f, i) => f(pos) + diffs[i]),
          }));

        knownBeacons = [...knownBeacons, ...rotated].map(
          ({ pos }, i, array) => ({
            pos,
            distances: array.map(({ pos: pos2 }) =>
              euclideanDistance(pos, pos2)
            ),
          })
        );
        merged.push(scannerToCompareId);

        if (merged.length === distances.length) {
          console.log(knownBeacons.length);
          console.log(
            Math.max(
              ...scanPositions
                .map((pos, i, all) =>
                  all.slice(i + 1).map((pos2) => manhattanDistance(pos, pos2))
                )
                .flat()
            )
          );
          exit();
        }
        match = true;
        break;
      }
      if (match) {
        break;
      }
    }
  }
}
