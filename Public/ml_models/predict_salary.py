import json
import sys
from pathlib import Path

import joblib
import pandas as pd


def parse_float(value):
    if value in ("", None):
        return 0.0
    return float(str(value).replace(",", "."))


def main():
    if len(sys.argv) < 2:
        raise ValueError("Missing JSON input.")

    payload = json.loads(sys.argv[1])
    model_path = Path(__file__).with_name("salary_linear_model.pkl")
    saved = joblib.load(model_path)

    model = saved["model"]
    features = saved["features"]
    metrics = saved.get("metrics", {})

    row = {feature: parse_float(payload.get(feature, 0)) for feature in features}
    input_df = pd.DataFrame([row], columns=features)
    prediction = max(0.0, float(model.predict(input_df)[0]))

    print(json.dumps({
        "prediction": round(prediction, 2),
        "features": row,
        "metrics": metrics,
    }))


if __name__ == "__main__":
    main()
