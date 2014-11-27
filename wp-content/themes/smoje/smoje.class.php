<?

class Smoje {
    
	private $json;

    public function __construct($_id) {
		
		$data = $this->__get_json();
		foreach ($data as $key => $value) {
		
			if ($value["id"] == $_id) {
			
				foreach($value as $key => $value) {
					
					$this->$key = $value;
				}
			}
		}
    }
	
	private function __get_json() {
	
		$file = "test-data.json";
		$data = json_decode(file_get_contents($file), true);
		return($data);
	}
}

?>
