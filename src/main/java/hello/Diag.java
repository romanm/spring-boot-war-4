package hello;

import java.util.List;

public class Diag {
	public Diag(String name, String desc){
		this.name=name;
		this.desc=desc;
	}
	private String name;
	private String desc;
	List<Diag> diags;

	public List<Diag> getDiags() {
		return diags;
	}
	public void setDiags(List<Diag> diags) {
		this.diags = diags;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getDesc() {
		return desc;
	}
	public void setDesc(String desc) {
		this.desc = desc;
	}
}
