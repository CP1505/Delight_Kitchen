package com.delightkitchen.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.delightkitchen.dtos.ProductDTO;
import com.delightkitchen.services.ProductServiceImpl;
import com.delightkitchen.utils.ResponseUtil;

@RequestMapping("/products")
@RestController
@CrossOrigin
public class ProductControllerImpl {

	@Autowired
	private ProductServiceImpl serviceImpl;

	@GetMapping("")
	public ResponseEntity<?> getAllProducts() {

		return ResponseUtil.success(serviceImpl.getAllProduct());
	}

	@GetMapping("/active")
	public ResponseEntity<?> getAllProductsByStatus() {

		return ResponseUtil.success(serviceImpl.getAllProductByStatus());
	}

	@GetMapping("/{id}")
	public ResponseEntity<?> getProductById(@PathVariable("id") int id) {

		return ResponseUtil.success(serviceImpl.getByProductId(id));
	}

	@GetMapping("/bycategory/{id}")
	public ResponseEntity<?> getProductByCatId(@PathVariable("id") int id) {

		return ResponseUtil.success(serviceImpl.getProductByCat(id));
	}

	@PostMapping("")
	public ResponseEntity<?> addProduct(@RequestBody ProductDTO productDTO) {
		return ResponseUtil.success(serviceImpl.addProduct(productDTO));

	}

	@PutMapping("/{id}")
	public ResponseEntity<?> updateProduct(@RequestBody ProductDTO productDTO, @PathVariable("id") int id) {
		return ResponseUtil.success(serviceImpl.updateProduct(productDTO, id));

	}

	@PatchMapping("/{id}")
	public ResponseEntity<?> updateProductStatus(@RequestBody ProductDTO productDTO, @PathVariable("id") int id) {
		return ResponseUtil.success(serviceImpl.updateProductStatus(productDTO, id));

	}

	@DeleteMapping("/{id}")
	public ResponseEntity<?> deleteProductById(@PathVariable("id") int id) {

		return ResponseUtil.success(serviceImpl.deleteByProductId(id));
	}

}
