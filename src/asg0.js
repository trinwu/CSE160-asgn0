// DrawRectangle.js
function main() {
    // Retrieve <canvas> element                                  <- (1)
    var canvas = document.getElementById('example');
    if (!canvas) {
        console.log('Failed to retrieve the <canvas> element');
        return;
    }

   // Get the rendering context for 2DCG                          <- (2)
   var ctx = canvas.getContext('2d');

   // Draw a blue rectangle                                       <- (3)
   ctx.fillStyle = 'rgba(0, 0, 0, 1.0)'; // Set a blue color
   ctx.fillRect(0, 0, 400, 400); // Fill a rectangle with the color

   // Draw vector v1
   let v1 = new Vector3([1, 1, 0]); 
   drawVector(v1, "red")

}

function drawVector(v, color) {
    let ctx = document.getElementById("example").getContext("2d");
    ctx.beginPath();
    ctx.moveTo(200, 200);
    ctx.lineTo(200 + v.elements[0] * 20, 200 - v.elements[1] * 20); 
    ctx.strokeStyle = color;
    ctx.stroke();
}

function handleDrawEvent() {
    const canvas = document.getElementById("example");
    const ctx = canvas.getContext("2d");

    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Re-fill background color
    ctx.fillStyle = 'rgba(0, 0, 0, 1.0)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Read values from inputs
    let x1 = parseFloat(document.getElementById("x1").value);
    let y1 = parseFloat(document.getElementById("y1").value);

    let x2 = parseFloat(document.getElementById("x2").value);
    let y2 = parseFloat(document.getElementById("y2").value);

    let v1 = new Vector3([x1, y1, 0]);
    let v2 = new Vector3([x2, y2, 0]);

    drawVector(v1, "red");
    drawVector(v2, "blue");
}

function handleDrawOperationEvent() {
    const canvas = document.getElementById("example");
    const ctx = canvas.getContext("2d");
  
    // Clear and re-fill background
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'rgba(0, 0, 0, 1.0)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  
    // Read vector input values
    let x1 = parseFloat(document.getElementById("x1").value);
    let y1 = parseFloat(document.getElementById("y1").value);
    let x2 = parseFloat(document.getElementById("x2").value);
    let y2 = parseFloat(document.getElementById("y2").value);
    let s = parseFloat(document.getElementById("scalar").value);
    let op = document.getElementById("operation").value;
  
    let v1 = new Vector3([x1, y1, 0]);
    let v2 = new Vector3([x2, y2, 0]);
  
    drawVector(v1, "red");
    drawVector(v2, "blue");
  
    let v3, v4;
  
    if (op === "add") {
        v3 = new Vector3(v1.elements).add(v2);
        drawVector(v3, "green");
    } else if (op === "sub") {
        v3 = new Vector3(v1.elements).sub(v2);
        drawVector(v3, "green");
    } else if (op === "mul") {
        v3 = new Vector3(v1.elements).mul(s);
        v4 = new Vector3(v2.elements).mul(s);
        drawVector(v3, "green");
        drawVector(v4, "green");
    } else if (op === "div") {
        v3 = new Vector3(v1.elements).div(s);
        v4 = new Vector3(v2.elements).div(s);
        drawVector(v3, "green");
        drawVector(v4, "green");
    } else if (op === "magnitude") {
        console.log(`v1 magnitude: ${v1.magnitude().toFixed(4)}`);
        console.log(`v2 magnitude: ${v2.magnitude().toFixed(4)}`);
    } else if (op === "normalize") {
        let v1Norm = new Vector3(v1.elements).normalize();
        let v2Norm = new Vector3(v2.elements).normalize();
        drawVector(v1Norm, "green");
        drawVector(v2Norm, "green");
    } else if (op === "angle") {
        let angle = angleBetween(v1, v2);
        if (angle !== null) {
            console.log(`Angle between v1 and v2: ${angle.toFixed(2)}°`);
        }
    } else if (op === "area") {
        let area = areaTriangle(v1, v2);
        console.log(`Area of triangle formed by v1 and v2: ${area.toFixed(4)}`);
    }
}

function angleBetween(v1, v2) {
    let dotVal = Vector3.dot(v1, v2);
    let mag1 = v1.magnitude();
    let mag2 = v2.magnitude();

    if (mag1 === 0 || mag2 === 0) {
        alert("Cannot compute angle with zero-length vector.");
        return null;
    }

    let cosTheta = dotVal / (mag1 * mag2);
    cosTheta = Math.min(1, Math.max(-1, cosTheta));

    let angleRad = Math.acos(cosTheta);
    let angleDeg = angleRad * (180 / Math.PI);
    return angleDeg;
}

function areaTriangle(v1, v2) {
    let cross = Vector3.cross(v1, v2);
    let area = 0.5 * cross.magnitude();
    return area;
}