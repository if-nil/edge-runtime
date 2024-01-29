use axum::response::Response as HttpResponse;
use axum::{http::StatusCode, response::IntoResponse,
    body::{boxed, Full},};
use serde::{Serialize, Serializer};

#[derive(Serialize)]
pub(crate)struct Response<T> {
    code: ResponseCode,
    message: String,
    data: T,
}

#[derive(Debug, Clone, Copy)]
enum ResponseCode {
    Success = 1000,
}

impl Serialize for ResponseCode {
    fn serialize<S>(&self, serializer: S) -> Result<S::Ok, S::Error>
    where
        S: Serializer,
    {
        serializer.serialize_i32(*self as i32)
    }
}

impl<T> Response<T> {
    pub(crate)fn success(data: T) -> Self {
        Self {
            code: ResponseCode::Success,
            message: "Success".to_string(),
            data,
        }
    }
}

impl<T> IntoResponse for Response<T>
where
    T: Serialize,
{
    fn into_response(self) -> HttpResponse {
        let body = serde_json::to_string(&self).unwrap();
        HttpResponse::builder()
            .status(StatusCode::OK)
            .header("Content-Type", "application/json")
            .body(boxed(Full::from(body)))
            .unwrap_or_else(|_| panic!("Invalid response"))
    }
}
