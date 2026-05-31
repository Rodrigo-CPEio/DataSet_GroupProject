import json
import sys
from pathlib import Path

import joblib
import pandas as pd


def main():
    if len(sys.argv) < 2:
        raise ValueError("Missing JSON input.")

    payload = json.loads(sys.argv[1])
    model_path = Path(__file__).with_name("stacking_jobsat_model.pkl")
    saved = joblib.load(model_path)

    model = saved["model"] if isinstance(saved, dict) and "model" in saved else saved
    features = saved.get("features") if isinstance(saved, dict) else [
        "YearsCodePro_Num",
        "WorkExp",
        "Age_Code",
        "JobSatPoints_1",
        "JobSatPoints_4",
        "JobSatPoints_5",
    ]

    row = {}
    for feature in features:
        value = payload.get(feature, 0)
        row[feature] = float(value) if value not in ("", None) else 0.0

    input_df = pd.DataFrame([row], columns=features)
    prediction = model.predict(input_df)[0]

    print(json.dumps({
        "prediction": str(prediction),
        "features": row,
    }))


if __name__ == "__main__":
    main()
