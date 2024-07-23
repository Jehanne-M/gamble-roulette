#[derive(Debug, serde::Serialize, serde::Deserialize)]
pub struct Items {
    name: String,
    bg: Option<String>,
    color: Option<String>,
    weight: Option<u32>,
}
