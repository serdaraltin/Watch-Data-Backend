from fastapi import FastAPI, HTTPException

app = FastAPI()

@app.post("/api/camera-test")
def camera_test(payload: dict):
    camera_id = payload.get("camera_id")

    if camera_id is None:
        raise HTTPException(status_code=400, detail="camera_id is required")

    # Perform some processing with camera_id if needed

    # Return a response
    return {"message": f"Success! Received camera_id: {camera_id}"}

