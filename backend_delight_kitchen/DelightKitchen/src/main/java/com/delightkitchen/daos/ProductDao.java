package com.delightkitchen.daos;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.delightkitchen.dtos.ProductDTOSend;
import com.delightkitchen.entities.Product;

@Repository
public interface ProductDao extends JpaRepository<Product, Integer> {
	Product findByProductId(int id);

	List<Product> findByCategory_CategoryIdAndProductStatus(int productCategoryId, String status);

	List<Product> findByProductStatus(String status);

}
