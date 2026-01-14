let connected = false;

function connect(): boolean {
  console.log("connecting...");
  connected = true;
  return connected;
}

connected || connect(); // prints "connecting..."
connected || connect(); // prints nothing (hidden control flow)
console.log("connected =", connected);
