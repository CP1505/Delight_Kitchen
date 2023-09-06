
package com.app.controller;

import java.time.LocalDateTime;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class HomePageController {

	public HomePageController() {
    
		System.out.println("in ctor of "+getClass());

	}
	
  @RequestMapping("/") 
  public String showHomePage(Model map)  {
	  System.out.println("on show home page");
	  map.addAttribute("server_ts",LocalDateTime.now());
	  return "/index";
	  
	    }
  

}
