package hello;

import java.util.ArrayList;
import java.util.concurrent.atomic.AtomicLong;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class Web7Controller {

	@RequestMapping(value="/", method=RequestMethod.GET)
	public String index() {
		return "index";
	}

	private static final String template = "Hello, %s!";
	private final AtomicLong counter = new AtomicLong();
	
//	public @ResponseBody Greeting icd10(
	@RequestMapping("/icd10")
	public @ResponseBody Diag icd10(
			@RequestParam(value="name", required=false, defaultValue="World") String name) {
		long id = counter.incrementAndGet();
		System.out.println("icd10 ------- 1 --------- = "+id);
//		SAXReader reader = new SAXReader();
//		System.out.println("--"+reader);
		Diag diag = new Diag("A03","Shigellosis");
		diag.setDiags(new ArrayList<Diag>());
		diag.getDiags().add(new Diag("A03.1", "Shigellosis due to Shigella flexneri"));
		diag.getDiags().add(new Diag("A03.2", "Shigellosis due to Shigella boydii"));
		return diag;
//		return new Greeting(id,
//				String.format(template, name));
	}
	@RequestMapping("/json")
	public @ResponseBody Greeting json(
			@RequestParam(value="name", required=false, defaultValue="World") String name) {
		long id = counter.incrementAndGet();
		System.out.println("------- 1 --------- = "+id);
		return new Greeting(id,
				String.format(template, name));
	}
	@RequestMapping("/greeting")
	public String greeting(@RequestParam(value="name", required=false, defaultValue="World") 
							String name, Model model) {
		model.addAttribute("name", name);
		return "greeting";
	}
	@RequestMapping("/applet1")
	public String applet1(@RequestParam(value="name", required=false, defaultValue="World") 
	String name, Model model) {
		model.addAttribute("name", name);
		return "applet1";
	}
	@RequestMapping("/calculatorApplet")
	public String calculatorApplet(@RequestParam(value="name", required=false, defaultValue="World") 
	String name, Model model) {
		model.addAttribute("name", name);
		return "calculatorApplet";
	}
	@RequestMapping("/angularjs-The-Basics")
	public String angularjsTheBasics() {
		return "angularjs-The-Basics";
	}
	@RequestMapping("/dir")
	public String dir() {
		return "dir";
	}
}
