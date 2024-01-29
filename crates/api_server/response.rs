use axum::response::Response as HttpResponse;
use axum::{http::StatusCode, response::IntoResponse,
    body::{boxed, Full},};
use serde::Serialize;

#[derive(Serialize)]
struct Response<T> {
    code: i32,
    message: String,
    data: T,
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
