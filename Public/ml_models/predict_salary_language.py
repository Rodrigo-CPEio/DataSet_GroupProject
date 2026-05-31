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
    model_path = Path(__file__).with_name("salary_language_model.pkl")
    saved = joblib.load(model_path)

    model = saved["model"]
    metrics = saved.get("metrics", {})
    row = {
        "Language": payload.get("Language", "Python"),
        "YearsCodePro_Num": parse_float(payload.get("YearsCodePro_Num", 0)),
        "WorkExp": parse_float(payload.get("WorkExp", 0)),
        "Age_Code": parse_float(payload.get("Age_Code", 0)),
    }

    input_df = pd.DataFrame([row], columns=saved["features"])
    prediction = max(0.0, float(model.predict(input_df)[0]))

    print(json.dumps({
        "prediction": round(prediction, 2),
        "features": row,
        "metrics": metrics,
    }))


if __name__ == "__main__":
    main()
