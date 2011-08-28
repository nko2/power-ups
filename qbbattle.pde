//Columns Shift Register
int latchPinC = 4;
int clockPinC = 3;
int dataPinC = 2;

//Rows Shift Register
int latchPinR = 9;
int clockPinR = 10;
int dataPinR = 8;

int buttonPin = 12;

int buttonState = 0;

int output;

int posx = 0;
int posy = 0;
int posz = 0;

int out0 = 0;
int out1 = 0;

void panelOut() {
  int zcord = 1 << posz;
  out0 = 1 << posx + (3 * posy);
  if (posx + (3 * posy) < 8) {
    out1 = 0;
  }
  else {
    out1 = 1;
  }
  digitalWrite(latchPinC, LOW);
  shiftOut(dataPinC, clockPinC, MSBFIRST, zcord);
  digitalWrite(latchPinR, LOW);
  shiftOut(dataPinR, clockPinR, MSBFIRST, out1);
  shiftOut(dataPinR, clockPinR, MSBFIRST, out0);
  digitalWrite(latchPinC, HIGH);
  digitalWrite(latchPinR, HIGH);
}

void setup() {
  pinMode(buttonPin, INPUT);
  pinMode(clockPinC, OUTPUT);
  pinMode(latchPinC, OUTPUT);
  pinMode(dataPinC,  OUTPUT);
  pinMode(clockPinR, OUTPUT);
  pinMode(latchPinR, OUTPUT);
  pinMode(dataPinR,  OUTPUT);
  digitalWrite(clockPinC, LOW);
  digitalWrite(latchPinC, LOW);
  digitalWrite(dataPinC,  LOW);
  digitalWrite(clockPinR, LOW);
  digitalWrite(latchPinR, LOW);
  digitalWrite(dataPinR,  LOW);
  Serial.begin(57600);
}

void loop() {
  posx = map(analogRead(0), 100, 1000, 0, 2);
  posy = map(analogRead(2), 100, 1000, 0, 2);
  posz = map(analogRead(4), 100, 1000, 0, 2);
  buttonState = digitalRead(buttonPin);
  if (buttonState == HIGH) {
    output = ((posx + 1) + (10 * (posy + 1)) + (100 * (posz + 1)));
    Serial.println(output);
    delay(500);
  }
  panelOut();
}
