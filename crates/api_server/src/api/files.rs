use crate::response::Response;

pub(crate)async fn file_list() -> Response<Vec<String>> {
    let mut files = vec![];
    for entry in std::fs::read_dir("./").unwrap() {
        let entry = entry.unwrap();
        let path = entry.path();
        let file_name = path.file_name().unwrap().to_str().unwrap().to_string();
        files.push(file_name);
    }
    Response::success(files)
}